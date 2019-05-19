import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from '../components/Player';

const PlayerList = ( { gameStatus, session } ) => {
  console.log( 'gameStatus.discardHolder > ', gameStatus.discardHolder );

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
          discardHolder={gameStatus.discardHolder}
          session={session}
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
