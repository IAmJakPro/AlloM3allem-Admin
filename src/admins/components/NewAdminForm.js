import { Form, Input, Button, Spin, Card } from 'antd';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

const NewAdminForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/admins`,
        'POST',
        JSON.stringify(values),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/admins');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="new-admin-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create admin" className="card-layout cu-form-card">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  min: 3,
                },
                {
                  max: 50,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input type="email" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                },
                {
                  max: 30,
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginTop: '1rem' }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default NewAdminForm;
