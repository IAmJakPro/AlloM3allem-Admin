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
  Rate,
} from 'antd';

import { useHttpClient } from '../../hooks/http-hook';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-hook';

const ReviewsTable = (props) => {
  const { role } = useAuth();
  const columns = [
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
      render: (value) => <Rate disabled defaultValue={value} />,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Rater',
      dataIndex: 'rater',
      key: 'rater',
      render: (value) =>
        value ? (
          value.name
        ) : (
          <small style={{ color: 'red' }}>Not found / deleted</small>
        ),
    },
    {
      title: 'Rated',
      dataIndex: 'rated',
      key: 'rated',
      render: (value) =>
        value ? (
          value.name
        ) : (
          <small style={{ color: 'red' }}>Not found / deleted</small>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, row, index) => {
        if (value === 'approved') return <Tag color="green">{value}</Tag>;
        if (value === 'disapproved') return <Tag color="red">{value}</Tag>;
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
            return (
              <Space size="middle">
                <Badge>
                  <a
                    href="#"
                    style={{
                      color: record.status === 'approved' ? 'coral' : 'green',
                    }}
                    onClick={() =>
                      changeStatusHandler(
                        record.id,
                        record.status === 'approved'
                          ? 'disapproved'
                          : 'approved'
                      )
                    }
                  >
                    {record.status === 'approved' && 'Disapprove'}
                    {record.status === 'disapproved' && 'Approve'}
                  </a>
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

  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchReviews = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/reviews?page=${page}&search=${search}`
        );
        setReviews(responseData.data);
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
      fetchReviews();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchReviews]);

  const onPaginateHandler = (page, pageSize) => {
    fetchReviews(page);
  };

  const onSearchHandler = (value) => {
    fetchReviews(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/reviews/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatusHandler = async (id, status) => {
    console.log(status);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/reviews/${id}`,
        'PATCH',
        JSON.stringify({
          status,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log(responseData);
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="reviews-table">
      <Card className="card-layout" title="Reviews">
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
                  <Link to="/reviews/create">Add new</Link>
                </Button>
              </Col> */}
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={reviews}
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

export default ReviewsTable;
