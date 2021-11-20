import {
  Form,
  Input,
  Button,
  Space,
  Spin,
  Row,
  Col,
  Card,
  Tag,
  Switch,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertToRaw, EditorState } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';

import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/auth-hook';

function htmlDecode(input) {
  return input;
  /* console.log('Input: ', input);
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue; */
}

const NewPageForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [bodyAr, setBodyAr] = useState(EditorState.createEmpty());
  const [bodyFr, setBodyFr] = useState(EditorState.createEmpty());

  const {token} = useAuth();

  const onFinish = async (values) => {
    const newValues = {
      title: {
        fr: values.title_fr,
        ar: values.title_ar,
      },
      body: {
        fr: htmlDecode(draftToHtml(convertToRaw(bodyFr.getCurrentContent()))),
        ar: htmlDecode(draftToHtml(convertToRaw(bodyAr.getCurrentContent()))),
      },
      isActive: values.isActive,
    };


    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/pages`,
        'POST',
        JSON.stringify(newValues),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/pages');
    } catch (err) {}
  };

  const onFinishFailed = (values) => {
    console.log('Failed: ', values);
  };

  const onBodyFrChange = (es) => {
    setBodyFr(es);
  };

  const onBodyArChange = (es) => {
    setBodyAr(es);
  };

  return (
    <div id="new-page-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create page" className="card-layout cu-form-card">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
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
              <Col span={12}>
                <Form.Item
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
              <Col span={12}>
                <Editor
                  editorState={bodyFr}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onBodyFrChange}
                />
              </Col>
              <Col span={12}>
                <Editor
                  editorState={bodyAr}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onBodyArChange}
                />
              </Col>
            </Row>
            <Form.Item label="Status" name="isActive">
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Not active"
                defaultChecked
              />
            </Form.Item>
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

export default NewPageForm;
