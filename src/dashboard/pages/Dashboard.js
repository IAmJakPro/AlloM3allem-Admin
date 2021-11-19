import { Card, Col, Row, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import DemoLine from '../components/LineChart';

const Dashboard = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [counts, setCounts] = useState();
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/analytics/counts`
        );
        console.log('this is response data: ', responseData.data);
        setCounts(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);
  return (
    <div>
      <Spin spinning={isLoading}>
        {!isLoading && counts && (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={16}>
              <Col span={4}>
                <Card title="Total Employees" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.employees}</h1>
                </Card>
              </Col>
              <Col span={4}>
                <Card title="Total Clients" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.clients}</h1>
                </Card>
              </Col>
              <Col span={4}>
                <Card title="Total Reviews" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.reviews}</h1>
                </Card>
              </Col>
              <Col span={4}>
                <Card title="Total Appointments" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.appointments}</h1>
                </Card>
              </Col>
              <Col span={4}>
                <Card title="Total Contracts" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.contracts}</h1>
                </Card>
              </Col>
              <Col span={4}>
                <Card title="Total Contacts" bordered={false}>
                  <h1 style={{ fontSize: '2rem' }}>{counts.contacts}</h1>
                </Card>
              </Col>
            </Row>
            <Card>
              <DemoLine />
            </Card>
          </Space>
        )}
      </Spin>
    </div>
  );
};

export default Dashboard;
