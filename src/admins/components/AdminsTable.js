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

const AdminsTable = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return (
          <Tag color="default" color="blue">
            {role}
          </Tag>
        );
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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        console.log(record);
        return (
          <Space size="middle">
            <Badge>
              <Link to={`/admins/edit/${record.id}`} style={{ color: 'green' }}>
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
    },
  ];

  const [admins, setAdmins] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchAdmins = useCallback(
    async (page = 1, search = '') => {
      console.log(process.env.REACT_APP_API_URL);
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/admins?page=${page}&search=${search}`
        );
        setAdmins(responseData.data);
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
      fetchAdmins();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchAdmins]);

  const onPaginateHandler = (page, pageSize) => {
    fetchAdmins(page);
  };

  const onSearchHandler = (value) => {
    fetchAdmins(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/admins/${id}`,
        'DELETE'
      );
      //console.log(responseData);
      fetchAdmins();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="admins-table">
      <Card className="card-layout" title="Admins">
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
                <Button type="primary">
                  <Link to="/admins/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={admins}
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

export default AdminsTable;
