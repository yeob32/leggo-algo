import React from 'react';
import PropTypes from 'prop-types';

import { Popconfirm, message, Icon, Button } from 'antd';

// import styled, { css } from 'styled-components';
/* 단순 변수의 형태가 아니라 여러줄의 스타일 구문을 조건부로 설정해야 하는 경우엔 css 를 불러와야합니다. */

interface Props {
  card: object;
}

/**
 *
 * 세션엗서 현재 턴 사용자 정보 가져와서 클릭 시 업데이트
 *
 */
const Card: React.SFC<Props> = ({ card }) => {
  // session.user.setDeckStack()
  // 선택된 카드 배열에서 삭제
  const build = () => {
    console.log(card);
  };

  const confirm = (e: any) => {
    console.log(e);

    // build() 내 카드 배열에 추가
    // pileCard 배열에서 제거
    message.success('Click on Yes'); // 얻은 카드 넘버
  };

  function cancel(e: any) {
    console.log(e);
    message.error('cancel');
  }

  return (
    <Popconfirm
      title="Do you want to select this card?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
    >
      <Button>
        <Icon type="question" />
      </Button>
      &nbsp;
    </Popconfirm>
  );
};

export default Card;
