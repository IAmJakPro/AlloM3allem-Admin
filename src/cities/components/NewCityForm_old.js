import { Form, Input, Button, Select, Spin, Tag } from 'antd';
//import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { useRef, useState } from 'react';

import './NewCityForm.css';

const NewCityForm = () => {
  const [state, setState] = useState({
    tags: [],
    inputVisible: false,
    inputValue: '',
  });

  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const onFinish = async (values) => {
    const tagsCopy = [...state.tags];
    const areas = tagsCopy.map((tag) => {
      return {
        name: tag,
      };
    });
    values.areas = areas;
    console.log('Success:', values);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/cities`,
        'POST',
        JSON.stringify(values),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/cities');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setState({ ...state, tags });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  /* const saveInputRef = (input) => {
    input = input;
  }; */

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  //const { tags, inputVisible, inputValue } = state;
  const tagChild = state.tags.map(forMap);

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
          <Form.Item name="areas" label="Areas">
            <div style={{ marginBottom: 16 }}>
              {tagChild}
              {state.inputVisible && (
                <Input
                  //ref={inputRef}
                  className="area-input"
                  autoFocus
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={state.inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!state.inputVisible && (
                <Tag onClick={showInput} className="site-area-plus">
                  <PlusOutlined /> New Area
                </Tag>
              )}
            </div>
          </Form.Item>
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
