import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';
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
      <MainStructure>
        <LoginForm />
      </MainStructure>
    );
  }
}

export default App;
