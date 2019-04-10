import React, { Component } from 'react';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveSession, getSession } from '../store/session/actions';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './LoginForm.css';

import axios from 'axios';

class LoginForm extends Component {
  // const { history, location, match } = useReactRouter();

  constructor( props, context ) {
    super( props, context );

    this.state = {
      id: '',
      name: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentDidMount( props ) {
    console.log( 'props > ', props );
  }

  info = () => {
    message.info( 'This is a normal message' );
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { id, password, name } = this.state;

    try {
      if ( id === '' || password === '' || name === '' ) {
        throw new Error( 'Enter anything' );
      }

      const result = await axios.post( 'http://localhost:3001/login', { id, name, password } );
      if ( result.data.code === '200' ) {
        // redux put
        saveSession( { id, name } );
        this.props.history.push( '/play' ); // history.push( '/play' );
      }
    } catch ( error ) {
      message.info( error.message );
    }
  };

  handleChange( e ) {
    this.setState( { [e.target.name]: e.target.value } );
  }

  render() {
    return (
      <div id="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            <Input
              name="id"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="UserId"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="name"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
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
  }
}

const mapStateToProps = state => ( {
  user: state.session,
} );

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
  getSession: () => dispatch( getSession() ),
} );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )( LoginForm ),
);
