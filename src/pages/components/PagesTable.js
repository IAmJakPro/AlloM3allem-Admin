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

const pagesTable = (props) => {
  const { role } = useAuth();
  const columns = [
    {
      title: 'Title',
      children: [
        {
          title: 'fr',
          dataIndex: ['title', 'fr'],
          key: 'name_fr',
        },
        {
          title: 'ar',
          dataIndex: ['title', 'ar'],
          key: 'name_ar',
        },
      ],
    },

    {
      title: 'Body',
      children: [
        {
          title: 'fr',
          dataIndex: ['body', 'fr'],
          key: 'name_fr',
          render: (value) => value.replace(/<[^>]+>/g, ''),
        },
        {
          title: 'ar',
          dataIndex: ['body', 'ar'],
          key: 'name_ar',
          render: (value) => value.replace(/<[^>]+>/g, ''),
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
                    to={`/pages/edit/${record.id}`}
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

  const [pages, setPages] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    currentPage: 1,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchPages = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/pages?page=${page}&search=${search}`
        );
        setPages(responseData.data);
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
      fetchPages();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchPages]);

  const onPaginateHandler = (page, pageSize) => {
    fetchPages(page);
  };

  const onSearchHandler = (value) => {
    fetchPages(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/pages/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchPages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="pages-table">
      <Card className="card-layout" title="Pages">
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
                  <Link to="/pages/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={pages}
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

export default pagesTable;
