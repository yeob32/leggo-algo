import React from 'react';

import { Row, Col, Card } from 'antd';
import Player from './components/Player';

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
        {userList.map((user, index) => (
          <Col span={12} key={user.id}>
            <Player user={user} pileCards={pileCards} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PlayerList;
