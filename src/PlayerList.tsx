import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from './Player';

interface Props {
  userList: [
    {
      id: number;
      name: string;
      deck: [
        {
          id: string;
          name: string;
          flip: boolean;
        }
      ];
    }
  ];
  pileCards: [{ id: string; name: string }];
}

const PlayerList: React.SFC<Props> = ({ userList, pileCards }) => {
  return (
    <Card title="플레이어">
      <Row>
        {userList.map(user => (
          <Col span={12}>
            <Player user={user} pileCards={pileCards} key={user.id} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PlayerList;
