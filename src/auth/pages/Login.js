import { Form, Input, Button, Checkbox, Card, Spin } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

const Login = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/admins/login`,
        'POST',
        JSON.stringify(values),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log(responseData);
      auth.login(responseData.data.id, responseData.token, responseData.role);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Card
        style={{ width: '30%' }}
        title="Login"
        headStyle={{
          fontSize: '3rem',
          textAlign: 'center',
        }}
      >
        <Spin spinning={isLoading}>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              type="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default Login;
