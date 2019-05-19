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

  // session.user.setDeckStack()
  // 선택된 카드 배열에서 삭제
  const build = () => {
    console.log( card );
  };

  const confirm = e => {
    setVisible( false );
    // build() 내 카드 배열에 추가
    // pileCard 배열에서 제거
    // message.success( 'Click on Yes' ); // 얻은 카드 넘버

    socketUtils().emit( 'action-random', { id: session.id, cardId: card.id } );
  };

  function cancel( e ) {
    setVisible( false );
    message.error( 'cancel' );
  }

  const handleVisibleChange = data => {
    console.log();

    if ( !data ) {
      setVisible( data );
      return;
    }

    if ( !disabled ) {
      setVisible( data );
    }

    console.log( 'data > ', data );
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
      {/* <a>
        <div>
          <Icon
            type="heart"
            theme="twoTone"
            twoToneColor="#eb2f96"
          />
        </div>
      </a> */}
      {/* <Button disabled={disabled}>
        <Icon
          type="heart"
          theme="twoTone"
          twoToneColor="#eb2f96"
        />
      </Button> */}
      &nbsp;
    </Popconfirm>
  );
};

export default Card;
