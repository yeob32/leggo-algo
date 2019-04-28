import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from '../components/Player';

const PlayerList = ( { members, pileCards } ) => {
  return (
    <Card title="플레이어">
      <Row>
        {members.map( ( member, index ) => (
          <Col span={12} key={member.id}>
            <Player member={member} pileCards={pileCards} />
          </Col>
        ) )}
      </Row>
    </Card>
  );
};

export default PlayerList;
