import { Form, Input, Button, Select, Spin, Card } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import UploadFormItem from '../../shared/components/UploadFormItem';

const EditUserForm = ({ cities, user }) => {
  const { isLoading, sendRequest } = useHttpClient();

  const [imgFile, setImgFile] = useState();

  const history = useHistory();

  const onFinish = async (values) => {
    console.log('VALUES: ', values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('image', imgFile);
    formData.append('password', values.password);
    formData.append('city', values.city);
    formData.append('sexe', values.sexe);
    formData.append('status', values.status);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/users/${user.id}`,
        'PATCH',
        formData,
        {
          Accept: 'application/json',
        }
      );
      history.push('/users');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getFile = (info) => {
    //console.log('infossss: ', info.file);
    setImgFile(info.file.originFileObj);
  };

  const { name, phone, city, status, image, sexe = 'none' } = user;
  const initialValues = {
    name,
    phone,
    city: city.id,
    sexe,
    status,
  };

  return (
    <div id="edit-user-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={initialValues}
        >
          <Card title="Edit user" className="card-layout cu-form-card">
            <Form.Item
              style={{ width: '100%' }}
              name="image"
              label="Upload image"
              valuePropName="fileList"
            >
              <UploadFormItem getFile={getFile} defaultImage={image} />
            </Form.Item>
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
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'string',
                  len: 10,
                  message: 'Phone number is invalid!',
                },
              ]}
            >
              <Input
                size="large"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Select placeholder="select city" size="large">
                {cities.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
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

            <Form.Item label="Sexe" name="sexe">
              <Select defaultValue={sexe} style={{ marginBottom: 40 }}>
                <Select.Option value="none">None</Select.Option>
                <Select.Option value="m">Male</Select.Option>
                <Select.Option value="f">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="User status" name="status">
              <Select defaultValue={status} style={{ marginBottom: 40 }}>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="desactive">Desactive</Select.Option>
                <Select.Option value="blocked">Block</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Update
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </Spin>
    </div>
  );
};

export default EditUserForm;
