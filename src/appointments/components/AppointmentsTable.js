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

const AppointmentsTable = (props) => {
  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
                to={`/appointments/edit/${record.id}`}
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

  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchAppointments = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/appointments?page=${page}&search=${search}`
        );
        setAppointments(responseData.data);
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
      fetchAppointments();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchAppointments]);

  const onPaginateHandler = (page, pageSize) => {
    fetchAppointments(page);
  };

  const onSearchHandler = (value) => {
    fetchAppointments(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/appointments/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="appointments-table">
      <Card className="card-layout" title="Appointments">
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
              {/* <Col span={12} style={{ textAlign: 'right' }}>
                <Button type="primary">
                  <Link to="/appointments/create">Add new</Link>
                </Button>
              </Col> */}
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={appointments}
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

export default AppointmentsTable;
