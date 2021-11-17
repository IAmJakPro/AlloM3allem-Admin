import { Card, Col, Row } from 'antd';
import { useEffect } from 'react';

const Dashboard = () => {
  /* useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/analyses/counts`
        );
        console.log('this is response data: ', responseData.data);
        setUser(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []); */
  return (
    <div>
      <Row gutter={16}>
        <Col span={4}>
          <Card title="Users" bordered={false}>
            <h1>2000</h1>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Reviews" bordered={false}>
            <h1>3000</h1>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Appointments" bordered={false}>
            <h1>3000</h1>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Contracts" bordered={false}>
            <h1>3000</h1>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Contacts" bordered={false}>
            <h1>3000</h1>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Cities" bordered={false}>
            <h1>3000</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
