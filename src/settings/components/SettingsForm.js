import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  Card,
  Row,
  Col,
  message,
} from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import UploadFormItem from '../../shared/components/UploadFormItem';
import { transToObject } from '../../utils/transObject';

const SettingsForm = ({ settings }) => {
  const { isLoading, sendRequest } = useHttpClient();

  const [logoImgFile, setLogoImgFile] = useState();
  const [iconImgFile, setIconImgFile] = useState();

  const onFinish = async (values) => {
    console.log(iconImgFile);

    const transValues = {
      title: transToObject(values.title_fr, values.title_ar),
      description: transToObject(values.description_fr, values.description_ar),
      address: transToObject(values.address_fr, values.address_ar),
    };

    const formData = new FormData();
    formData.append('title.fr', transValues.title.fr);
    formData.append('title.ar', transValues.title.ar);
    formData.append('description.fr', transValues.description.fr);
    formData.append('description.ar', transValues.description.ar);
    formData.append('address.fr', transValues.address.fr);
    formData.append('address.ar', transValues.address.ar);
    formData.append('logo', logoImgFile);
    formData.append('icon', iconImgFile);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('socials.facebook', values.facebook);
    formData.append('socials.instagram', values.instagram);
    formData.append('socials.twitter', values.twitter);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/settings`,
        'PATCH',
        formData,
        {
          Accept: 'application/json',
        }
      );
      if (responseData.status === 'success') {
        message.success('Updated successfully!');
      }
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getLogoFile = (info) => {
    setLogoImgFile(info.file.originFileObj);
  };

  const getIconFile = (info) => {
    setIconImgFile(info.file.originFileObj);
  };

  const {
    title,
    logo,
    icon,
    description,
    address,
    phone,
    email,
    socials,
    maintenance_mode,
  } = settings;
  const initialValues = {
    title_fr: title.fr,
    title_ar: title.ar,
    description_fr: description.fr,
    description_ar: description.ar,
    address_fr: address.fr,
    address_ar: address.ar,
    logo,
    icon,
    phone,
    email,
    facebook: socials.facebook,
    instagram: socials.instagram,
    twitter: socials.twitter,
  };

  return (
    <div id="edit-settings-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={initialValues}
        >
          <Card title="Edit settings" className="card-layout cu-form-card">
            <Form.Item
              style={{ width: '100%' }}
              name="logo"
              label="Upload logo"
              valuePropName="fileList"
            >
              <UploadFormItem getFile={getLogoFile} defaultImage={logo} />
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="icon"
              label="Upload icon"
              valuePropName="fileList"
            >
              <UploadFormItem getFile={getIconFile} defaultImage={icon} />
            </Form.Item>
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
                  label="Descriptionfr"
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
                  label="Descriptionar"
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
                  label="Address fr"
                  name="address_fr"
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
                  label="Address ar"
                  name="address_ar"
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Facebook" name="facebook">
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Instagram" name="instagram">
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Twitter" name="twitter">
              <Input size="large" />
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

export default SettingsForm;
