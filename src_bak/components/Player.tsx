import React from 'react';
import PropTypes from 'prop-types';

import { Card, Avatar, Row, Col } from 'antd';

import DeckList from '../DeckList';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

interface Props {
  user: { id: number; name: string; deck: [{ id: string; name: string; flip: boolean }] };
  pileCards: [{ id: string; name: string }];
}

const PlayerInfo = (user: { id: number; name: string }) => (
  <div>
    <Row>
      <Col span={12}>
        <Avatar
          style={{ backgroundColor: colorList[user.id], verticalAlign: 'middle' }}
          size="large"
        >
          {user.id}
        </Avatar>
      </Col>
      <Col span={12}>
        <h1>{user.name}</h1>
      </Col>
    </Row>
  </div>
);

const Player: React.SFC<Props> = ({ user, pileCards }) => {
  return (
    <div style={{ padding: '30px' }}>
      <Card title={PlayerInfo(user)} bordered={false} style={{ width: 300 }}>
        <DeckList decks={user.deck} pileCards={pileCards} />
      </Card>
    </div>
  );
};

export default Player;
