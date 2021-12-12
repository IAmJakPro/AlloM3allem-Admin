import {
  Form,
  Input,
  Button,
  Upload,
  Spin,
  Row,
  Col,
  Card,
  message,
  Switch,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { transToObject } from '../../utils/transObject';

import UploadFormItem from '../../shared/components/UploadFormItem';

const NewServiceForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [imgFile, setImgFile] = useState();

  const getFile = (info) => {
    //console.log('infossss: ', info.file);
    setImgFile(info.file.originFileObj);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    const newValues = {
      name: transToObject(values.name_fr, values.name_ar),
      title: transToObject(values.title_fr, values.title_ar),
      description: transToObject(values.description_fr, values.description_ar),
      keywords: transToObject(values.keywords_fr, values.keywords_ar),
      image: imgFile,
      isActive: values.isActive,
    };

    const formData = new FormData();
    formData.append('name.fr', newValues.name.fr);
    formData.append('name.ar', newValues.name.ar);
    formData.append('image', newValues.image);
    formData.append('isActive', newValues.isActive);
    formData.append('seo.description.fr', newValues.description.fr);
    formData.append('seo.description.ar', newValues.description.ar);
    formData.append('seo.keywords.fr', newValues.keywords.fr);
    formData.append('seo.keywords.ar', newValues.keywords.ar);
    formData.append('seo.url', values.url);
    formData.append('seo.title.fr', newValues.title.fr);
    formData.append('seo.title.ar', newValues.title.ar);

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/services`,
        'POST',
        formData,
        {
          Accept: 'application/json',
        }
      );
      history.push('/services');
    } catch (err) {}
  };

  const onFinishFailed = (values) => {
    console.log('Failed: ', values);
  };

  return (
    <div id="new-service-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create service" className="card-layout cu-form-card">
            <Row gutter={16}>
              <Col span={4} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="image"
                  label="Upload image"
                  valuePropName="fileList"
                >
                  <UploadFormItem getFile={getFile} />
                </Form.Item>
              </Col>
              <Col span={10} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
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
              <Col span={10} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
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

            <Form.Item label="Status" name="isActive" initialValue={true}>
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Not active"
                defaultChecked
              />
            </Form.Item>
          </Card>
          <Card
            title="Search Engine Optimization"
            className="card-layout cu-form-card"
          >
            <Row gutter={16}>
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Title fr"
                  name="title_fr"
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
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Title ar"
                  name="title_ar"
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
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Description fr"
                  name="description_fr"
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
                  <Input.TextArea size="large" />
                </Form.Item>
              </Col>
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Description ar"
                  name="description_ar"
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
                  <Input.TextArea size="large" />
                </Form.Item>
              </Col>
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Keywords separated by ',' fr"
                  name="keywords_fr"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Keywords separated by ',' ar"
                  name="keywords_ar"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
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

export default NewServiceForm;
