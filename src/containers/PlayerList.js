import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from '../components/Player';

const PlayerList = ( { userList, pileCards } ) => {
  return (
    <Card title="플레이어">
      <Row>
        {userList.map( ( user, index ) => (
          <Col span={12} key={user.id}>
            <Player user={user} pileCards={pileCards} />
          </Col>
        ) )}
      </Row>
    </Card>
  );
};

export default PlayerList;
