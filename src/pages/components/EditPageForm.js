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

import { ContentState, convertToRaw, EditorState } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { useState } from 'react';

const NewPageForm = ({ page }) => {
  console.log(page.body);
  const blocksFromHtmlFr = htmlToDraft(page.body.fr);
  const blocksFromHtmlAr = htmlToDraft(page.body.ar);
  //const { contentBlocksFr, entityMapFr } = blocksFromHtmlFr;
  //const { contentBlocksAr, entityMapAr } = blocksFromHtmlAr;
  /* const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  ); */
  //const editorState = EditorState.createWithContent(contentState);

  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [bodyAr, setBodyAr] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHtmlAr.contentBlocks)
    )
  );
  const [bodyFr, setBodyFr] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHtmlFr.contentBlocks)
    )
  );

  const onFinish = async (values) => {
    const newValues = {
      title: {
        fr: values.title_fr,
        ar: values.title_ar,
      },
      body: {
        fr: draftToHtml(convertToRaw(bodyFr.getCurrentContent())),
        ar: draftToHtml(convertToRaw(bodyAr.getCurrentContent())),
      },
      isActive: values.isActive,
    };

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/pages/${page.id}`,
        'PATCH',
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

  const formInitialValues = {
    title_fr: page.title.fr,
    title_ar: page.title.ar,
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
          initialValues={formInitialValues}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default NewPageForm;
