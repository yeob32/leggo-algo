import React from 'react';

import { Popconfirm, message, Icon, Button } from 'antd';

import socketUtils from '../utils/socketUtil';
/**
 *
 * 세션엗서 현재 턴 사용자 정보 가져와서 클릭 시 업데이트
 *
 */
const Card = ( { card, session } ) => {
  const disabled = !session.turn || session.auth.random;

  // session.user.setDeckStack()
  // 선택된 카드 배열에서 삭제
  const build = () => {
    console.log( card );
  };

  const confirm = e => {
    // build() 내 카드 배열에 추가
    // pileCard 배열에서 제거
    // message.success( 'Click on Yes' ); // 얻은 카드 넘버

    socketUtils().emit( 'action-random', { id: session.id, cardId: card.id } );
  };

  function cancel( e ) {
    message.error( 'cancel' );
  }

  return (
    <Popconfirm
      title="Do you want to select this card?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      icon={(
        <Icon
          type="question-circle-o"
          style={{ color: 'red' }}
        />
)}
    >
      <Button disabled={disabled}>
        <Icon type="question" />
      </Button>
      &nbsp;
    </Popconfirm>
  );
};

export default Card;
