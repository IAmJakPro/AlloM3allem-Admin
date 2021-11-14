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
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { transToObject } from '../../utils/transObject';

import UploadFormItem from '../../shared/components/UploadFormItem';

const EditServiceForm = (props) => {
  const { service } = props;
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [imgFile, setImgFile] = useState();

  const getFile = (info) => {
    setImgFile(info.file.originFileObj);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    const newValues = {
      name: transToObject(values.name_fr, values.name_ar),
      image: imgFile,
    };

    const formData = new FormData();
    formData.append('name.fr', newValues.name.fr);
    formData.append('name.ar', newValues.name.ar);
    formData.append('image', newValues.image);

    console.log(newValues);

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/services/${service.id}`,
        'PATCH',
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

  const formInitialValues = {
    name_fr: service.name.fr,
    name_ar: service.name.ar,
  };

  return (
    <div id="edit-service-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={formInitialValues}
        >
          <Card title="Edit service" className="card-layout cu-form-card">
            <Row gutter={16}>
              <Col span={4} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="image"
                  label="Upload image"
                  valuePropName="fileList"
                >
                  <UploadFormItem
                    getFile={getFile}
                    defaultImage={service.image}
                  />
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

export default EditServiceForm;
