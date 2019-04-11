import React from 'react';

import { Row, Col, Card } from 'antd';

const StatusInterface = ( { session, pileCards, members } ) => {
  return (
    <Card title="진행상황">
      <p>내 정보: {JSON.stringify( session )}</p>
      <p>남은 카드 개수 : {pileCards.length}</p>
      <p>순서 : {pileCards.length}</p>
      <p>접속중인 유저 : {JSON.stringify( members )}</p>
    </Card>
  );
};

export default StatusInterface;
