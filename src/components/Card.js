import React, { useState } from 'react';

import { Popconfirm, message, Icon, Button } from 'antd';

import socketUtils from '../utils/socketUtil';

import './Card.css';

/**
 *
 * 세션엗서 현재 턴 사용자 정보 가져와서 클릭 시 업데이트
 *
 */
const Card = ( { card, session } ) => {
  const [ visible, setVisible ] = useState( false );

  const disabled = !session.turn || session.auth.random;

  const confirm = e => {
    setVisible( false );

    socketUtils().emit( 'action-random', { id: session.id, cardId: card.id } );
  };

  function cancel( e ) {
    setVisible( false );
    message.error( 'cancel' );
  }

  const handleVisibleChange = data => {
    if ( !data ) {
      setVisible( data );
      return;
    }

    if ( !disabled ) {
      setVisible( data );
    }
  };

  return (
    <Popconfirm
      title="Do you want to select this card?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      icon={(
        <Icon
          type="question-circle-o"
          style={{ color: 'red' }}
        />
)}
    >
      <a>
        <div
          className="card-shape"
          style={{ backgroundColor: card.type === 'black' ? '#3E3C3C' : '#FAF5F5' }}
        >
          <div className="card-detail">
            <Icon type="robot" />
          </div>
        </div>
      </a>
    </Popconfirm>
  );
};

export default Card;
