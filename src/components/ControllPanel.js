import React from 'react';
import { connect } from 'react-redux';

import { Button, message } from 'antd';

import socketUtil from '../utils/socketUtil';

class ControllPanel extends React.Component {
  start = () => {
    const { auth } = this.props.sessionReducer;

    // start => 카드분배 => 턴 순회 1분 => 점수
    socketUtil().emit( 'start', auth.host );
  };

  join = () => {
    const { id, name, enter } = this.props.sessionReducer;

    if ( enter ) {
      message.warn( '이미 참가함' );
      return;
    }

    socketUtil().emit( 'join', id, name );
    // socketUtil().on( 'member-list', data => {
    // this.props.dispatch( { type: 'UPDATE', data: { members: data } } );
    // this.saveCurrentSession();
    // } );
  };

  exit = () => {
    const { id, enter } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;

    if ( !enter ) {
      message.warn( '참가부터해라' );
      return;
    }

    if ( deal ) {
      message.warn( '게임중에는 못나간다' );
      return;
    }

    socketUtil().emit( 'exit', id );
  };

  saveCurrentSession = () => {
    const { members } = this.props.gameReducer;
    const { id } = this.props.sessionReducer;

    const currentUser = members.find( mem => mem.id === id );

    this.props.dispatch( { type: 'session/SAVE', session: currentUser } );
  };

  render() {
    const { host } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;
    const { start, join, exit } = this;
    const showButton = host && !deal;

    return (
      <div>
        {showButton ? (
          <Button type="primary" size="large" onClick={start} style={{ marginRight: '8px' }}>
            시작
          </Button>
        ) : (
          ''
        )}
        <Button type="primary" size="large" onClick={join} style={{ marginRight: '8px' }}>
          참가
        </Button>
        <Button type="" onClick={exit} size="large" style={{ marginRight: '8px' }}>
          나가기
        </Button>
      </div>
    );
  }
}

export default connect( state => state )( ControllPanel );
