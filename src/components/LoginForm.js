import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './LoginForm.css';

import axios from 'axios';

const LoginForm = () => {
  const { history, location, match } = useReactRouter();

  const [ id, setId ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const addSession = () => {};

  const info = () => {
    message.info( 'This is a normal message' );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if ( id === '' || password === '' ) {
        throw new Error( 'Enter anything' );
      }
    } catch ( error ) {
      message.info( error.message );
    }
    const result = await axios.post( 'http://localhost:3001/login', { id, password } );
    console.log( 'result > ', result );
    if ( result.data.code === '200' ) {
      console.log( 'asdf' );
      history.push( '/play' );
    }
  };

  return (
    <div id="login-container">
      <Form onSubmit={e => handleSubmit( e )} className="login-form">
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={e => setId( e.target.value )}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={e => setPassword( e.target.value )}
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
