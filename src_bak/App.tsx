import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';
import { AppState } from './store';

import { SystemState } from './store/system/types';
import { updateSession } from './store/system/actions';

import { ChatState } from './store/chat/types';
import { sendMessage } from './store/chat/actions';

import { thunkSendMessage } from './thunks';

interface AppProps {
  sendMessage: typeof sendMessage;
  updateSession: typeof updateSession;
  chat: ChatState;
  system: SystemState;
  thunkSendMessage: any;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

class App extends Component<AppProps> {
  // public componentDidMount = () => {
  //   const socket = socketIOClient('http://localhost:3001');
  //   setInterval(() => socket.emit('chat message', 'dgngkqkqk!!!!'), 1000);
  //   socket.on('chat message', (data: string) => {
  //     console.log('data > ', data);
  //   });
  // };

  state = {
    message: '',
  };

  componentDidMount() {
    this.props.updateSession({
      loggedIn: true,
      session: 'my_session',
      userName: 'myName',
    });
    this.props.sendMessage({
      user: 'Chat Bot',
      message:
        'This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.',
      timestamp: new Date().getTime(),
    });

    this.props.thunkSendMessage('This message was sent by a thunk!');
  }

  updateMessage = (event: UpdateMessageParam) => {
    this.setState({ message: event.currentTarget.value });
  };

  sendMessage = (message: string) => {
    this.props.sendMessage({
      user: this.props.system.userName,
      message: message,
      timestamp: new Date().getTime(),
    });
    this.setState({ message: '' });
  };

  public render() {
    return (
      <MainStructure>
        <LoginForm />
      </MainStructure>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  { sendMessage, updateSession, thunkSendMessage },
)(App);
