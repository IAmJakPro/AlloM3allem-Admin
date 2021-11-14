import { Form, Input, Button, Select, Spin, Card } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

const EditAdminForm = (props) => {
  const { admin } = props;

  const { isLoading, sendRequest } = useHttpClient();

  const history = useHistory();

  const onFinish = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/admins/${admin.id}`,
        'PATCH',
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

  const { name, email } = admin;
  const initialValues = {
    name,
    email,
  };

  return (
    <div id="edit-admin-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={initialValues}
        >
          <Card className="card-layout cu-form-card" title="Edit admin">
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
              <Input size="large" value={admin.name} />
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
                  required: false,
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
            <Button type="primary" htmlType="submit" size="large">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default EditAdminForm;
