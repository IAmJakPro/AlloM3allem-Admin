import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Space,
  Input,
  Row,
  Col,
  Button,
  Popconfirm,
  Badge,
  Card,
  Tag,
} from 'antd';

import { useHttpClient } from '../../hooks/http-hook';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-hook';

const UsersTable = (props) => {
  const { role } = useAuth();
  const columns = [
    {
      title: 'Photo',
      dataIndex: 'image',
      key: 'image',
      render: (imageSrc) => (
        <div>
          <img
            src={imageSrc}
            width="100"
            height="100"
            style={{ maxHeight: '200px', maxWidth: '200px' }}
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value, row, index) => {
        if (value == 'employee') {
          return <Tag color="cyan">{value}</Tag>;
        }
        if (value == 'client') {
          return <Tag color="blue">{value}</Tag>;
        }
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, row, index) => {
        if (value === 'active') return <Tag color="green">{value}</Tag>;
        if (value === 'desactive') return <Tag color="yellow">{value}</Tag>;
        if (value === 'blocked') return <Tag color="orange">{value}</Tag>;
        if (value === 'deleted') return <Tag color="red">{value}</Tag>;
      },
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Last log in',
      dataIndex: 'lastLogInAt',
      key: 'lastLogInAt',
      render: (value) => {
        if (!value) return<span>-</span>;
        const date = new Date(value);
        return date.toLocaleString('en-US');
      },
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleString('en-US');
      },
    },
    role !== 'viewer'
      ? {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => {
            console.log(record);
            return (
              <Space size="middle">
                <Badge>
                  <Link
                    to={`/users/edit/${record.id}`}
                    style={{ color: 'green' }}
                  >
                    Edit
                  </Link>
                </Badge>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => deleteHandler(record.id)}
                >
                  <a href="#" style={{ color: 'red' }}>
                    Delete
                  </a>
                </Popconfirm>
              </Space>
            );
          },
        }
      : {},
  ];

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchUsers = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/users?page=${page}&search=${search}`
        );
        setUsers(responseData.data);
        setPagination(responseData.pagination);
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest]
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchUsers();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchUsers]);

  const onPaginateHandler = (page, pageSize) => {
    fetchUsers(page);
  };

  const onSearchHandler = (value) => {
    fetchUsers(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/users/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="users-table">
      <Card className="card-layout" title="Users">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="table-toolbar">
            <Row gutter={16}>
              <Col span={12}>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  onSearch={onSearchHandler}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                {role !== 'viewer' && (
                  <Button type="primary">
                    <Link to="/users/create">Add new</Link>
                  </Button>
                )}
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{
              total: pagination.totalRecords,
              pageSize: pagination.perPage,
              current: pagination.currentPage,
              onChange: onPaginateHandler,
            }}
            loading={isLoading}
          />
        </Space>
      </Card>
    </div>
  );
};

export default UsersTable;
