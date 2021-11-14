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

const CitiesTable = (props) => {
  const columns = [
    {
      title: 'Name',
      /* dataIndex: 'name',
      key: 'name', */
      children: [
        {
          title: 'fr',
          dataIndex: ['name', 'fr'],
          key: 'name_fr',
        },
        {
          title: 'ar',
          dataIndex: ['name', 'ar'],
          key: 'name_ar',
        },
      ],
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
        return (
          <Space size="middle">
            <Badge>
              <Link to={`/cities/edit/${record.id}`} style={{ color: 'green' }}>
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

  const [cities, setCities] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    totalRecords: 0,
    currentPage: 1,
    perPage: 3,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchCities = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/cities?page=${page}&search=${search}`
        );
        setCities(responseData.data);
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
      fetchCities();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchCities]);

  const onPaginateHandler = (page, pageSize) => {
    fetchCities(page);
  };

  const onSearchHandler = (value) => {
    fetchCities(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/cities/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchCities();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="cities-table">
      <Card className="card-layout" title="Cities">
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
                  <Link to="/cities/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={cities}
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

export default CitiesTable;
