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

const ContractsTable = (props) => {
  const columns = [
    {
      title: 'employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (value) => {
        return value.name;
      },
    },
    {
      title: 'client',
      dataIndex: 'client',
      key: 'client',
      render: (value) => {
        return value.name;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'workType',
      dataIndex: 'workType',
      key: 'workType',
    },
    {
      title: 'service',
      dataIndex: 'service',
      key: 'service',
      render: (value) => {
        return value.name['fr'];
      },
    },
    {
      title: 'summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'startAt',
      dataIndex: 'startAt',
      key: 'startAt',
    },
    {
      title: 'finishAt',
      dataIndex: 'finishAt',
      key: 'finishAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, row, index) => {
        if (value === 'accepted') return <Tag color="green">{value}</Tag>;
        if (value === 'in_revision') return <Tag color="orange">{value}</Tag>;
        if (value === 'refused') return <Tag color="red">{value}</Tag>;
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
              <Link
                to={`/contracts/edit/${record.id}`}
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
    },
  ];

  const [contracts, setContract] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchContract = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/contracts?page=${page}&search=${search}`
        );
        setContract(responseData.data);
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
      fetchContract();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchContract]);

  const onPaginateHandler = (page, pageSize) => {
    fetchContract(page);
  };

  const onSearchHandler = (value) => {
    fetchContract(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/contracts/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchContract();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="contracts-table">
      <Card className="card-layout" title="Contract">
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
                  <Link to="/contracts/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={contracts}
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

export default ContractsTable;
