import React from 'react';
import { connect } from 'react-redux';

import { Button, message, Row } from 'antd';

import DefaultCountdown from '../components/DefaultCountdown';

import socketUtil from '../utils/socketUtil';

class ControllPanel extends React.Component {
  start = () => {
    const { host } = this.props.sessionReducer;
    const { members } = this.props.gameReducer;
    // start => 카드분배 => 턴 순회 1분 => 점수

    if ( members && members.length > 1 ) {
      socketUtil().emit( 'start', host );
    } else {
      message.warn( '혼자서는 게임 못하지' );
    }
  };

  join = () => {
    const { id, name, enter } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;

    if ( enter ) {
      message.warn( '이미 참가함' );
      return;
    }

    if ( deal ) {
      message.warn( '게임 중에는 참가 못함' );
      return;
    }

    socketUtil().emit( 'join', { id, name } );
  };

  exit = () => {
    const { id, name, enter } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;

    if ( !enter ) {
      message.warn( '참가부터해라' );
      return;
    }

    if ( deal ) {
      message.warn( '게임중에는 못나간다' );
      return;
    }

    socketUtil().emit( 'exit', { id, name } );
  };

  render() {
    const { host } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;
    const { start, join, exit } = this;

    const showButton = host && !deal;

    return (
      <Row>
        {showButton ? (
          <Button
            type="primary"
            size="large"
            onClick={start}
            style={{ marginRight: '8px' }}
          >
            시작
          </Button>
        ) : (
          ''
        )}
        <Button
          type="primary"
          size="large"
          onClick={join}
          style={{ marginRight: '8px' }}
        >
          참가
        </Button>
        <Button
          type=""
          onClick={exit}
          size="large"
          style={{ marginRight: '8px' }}
        >
          나가기
        </Button>

        <DefaultCountdown />
      </Row>
    );
  }
}

export default connect( state => state )( ControllPanel );
