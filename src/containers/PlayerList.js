import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from '../components/Player';

const PlayerList = ( { gameStatus } ) => {
  const Players =
    gameStatus.members &&
    gameStatus.members.map( member => (
      <Col
        span={12}
        key={member.id}
      >
        <Player
          member={member}
          pileCards={gameStatus.pileCards}
        />
      </Col>
    ) );

  return (
    <Card title="플레이어">
      <Row>{Players}</Row>
    </Card>
  );
};

export default PlayerList;
