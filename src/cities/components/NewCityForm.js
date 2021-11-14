import { Form, Input, Button, Space, Spin, Row, Col, Card, Tag } from 'antd';
//import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { useState } from 'react';

import './NewCityForm.css';

const NewCityForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();

  const onFinish = async (values) => {
    const newValues = {
      name: {
        fr: values.name_fr,
        ar: values.name_ar,
      },
    };

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/cities`,
        'POST',
        JSON.stringify(newValues),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/cities');
    } catch (err) {}
  };

  const onFinishFailed = (values) => {
    console.log('Failed: ', values);
  };

  return (
    <div id="new-city-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create city" className="card-layout cu-form-card">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name fr"
                  name="name_fr"
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Name ar"
                  name="name_ar"
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
              </Col>
            </Row>
            {/* <Form.List name="areas">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row gutter={16}>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name_ar']}
                          fieldKey={[fieldKey, 'name_ar']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Area ar" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name_fr']}
                          fieldKey={[fieldKey, 'name_fr']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Area fr" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List> */}
          </Card>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default NewCityForm;
