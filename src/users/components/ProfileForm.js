import { Form, Input, Button, Select, Spin, Card } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useHttpClient } from '../../hooks/http-hook';

const ProfileForm = ({ employee, cities }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/services`,
          'GET',
          null,
          {
            'Accept-Language': 'fr',
          }
        );
        if (responseData.status === 'success') {
          setServices(responseData.data);
        }
      } catch (err) {}
    };
    fetchServices();
  }, []);

  const onFinish = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/employees/${employee.id}`,
        'PATCH',
        JSON.stringify(values),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/users');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { age, service, experience, description, workIn } = employee;
  const initialValues = {
    age,
    service,
    experience,
    description,
    workIn,
  };
  console.log(initialValues);
  return (
    <>
      <Form
        className="cu-form"
        name="profile"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={initialValues}
      >
        <Card
          title="Edit employee profile"
          className="card-layout cu-form-card"
        >
          <Form.Item label="Age" name="age">
            <Input size="large" type="number" />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Select placeholder="select service" size="large">
              {services.map(({ id, name }, index) => (
                <Select.Option key={index} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="workIn"
            name="workIn"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Select placeholder="select cities" size="large" mode="multiple">
              {cities.map(({ id, name }, index) => (
                <Select.Option key={index} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Experience" name="experience">
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea size="large" rows="5" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Update
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};

export default ProfileForm;
