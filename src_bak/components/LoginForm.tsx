import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './LoginForm.css';

const LoginForm = () => {
  const { history, location, match } = useReactRouter();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const addSession = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id !== '' || password !== '') {
        throw new Error('errors');
      }
    } catch (e) {
      message.info('Enter anything');
    }

    return;

    try {
      if (id !== 'system' || password !== '1234') {
        throw new Error('권한 없음');
      }

      // localStorage
      history.push('/play');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div id="login-container">
      <Form onSubmit={e => handleSubmit(e)} className="login-form">
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={e => setId(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
