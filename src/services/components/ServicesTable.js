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
} from 'antd';

import { useHttpClient } from '../../hooks/http-hook';
import { Link } from 'react-router-dom';

const ServicesTable = (props) => {
  const columns = [
    {
      title: 'Service',
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
        console.log(record);
        return (
          <Space size="middle">
            <Badge>
              <Link
                to={`/services/edit/${record.id}`}
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

  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    totalRecords: 0,
    currentPage: 1,
    perPage: 3,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchServices = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/services?page=${page}&search=${search}`
        );
        setServices(responseData.data);
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
      fetchServices();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchServices]);

  const onPaginateHandler = (page, pageSize) => {
    fetchServices(page);
  };

  const onSearchHandler = (value) => {
    fetchServices(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/services/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="services-table">
      <Card className="card-layout" title="services">
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
                  <Link to="/services/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={services}
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

export default ServicesTable;
