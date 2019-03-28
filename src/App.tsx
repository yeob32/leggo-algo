import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const { Header, Content, Footer } = Layout;

import socketIOClient from 'socket.io-client';

import LoginForm from './components/LoginForm';

// import './App.css';

class App extends Component {
  public componentDidMount = () => {
    const socket = socketIOClient('http://localhost:3001');
    setInterval(() => socket.emit('chat message', 'dgngkqkqk!!!!'), 1000);
    socket.on('chat message', (data: string) => {
      console.log('data > ', data);
    });
  };

  public render() {
    return (
      <div>
        <LoginForm />;
      </div>
    );
  }
}

export default App;
