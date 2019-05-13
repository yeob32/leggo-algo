import React from 'react';

import { Card, Avatar, Row, Col, Icon, Button } from 'antd';

import DeckList from '../containers/DeckList';
import socketUtils from '../utils/socketUtil';

const colorList = [ '#f56a00', '#7265e6', '#ffbf00', '#00a2ae' ];

const Player = ( { member, pileCards } ) => {
  const getRandomCard = id => {
    if ( pileCards ) {
      return pileCards[0];
    }

    socketUtils().emit( 'action', 'random', id );
  };

  const PlayerInfo = (
    <div>
      <Row>
        <Col span={12}>
          <Avatar
            style={{ backgroundColor: colorList[member.id], verticalAlign: 'middle' }}
            size="large"
          >
            {member.id}
          </Avatar>
        </Col>
        <Col span={12}>
          <h1>
            {member.name} {member.turn && (
            <Icon
              type="sync"
              spin
            />
)}
            {member.turn ? (
              <Button
                type="primary"
                onClick={getRandomCard( member.id )}
              >
                랜덤 카드
              </Button>
            ) : (
              ''
            )}
          </h1>
          {/* 만약 user 의 turn 이 true 면  trun 바뀔때마다 members data 받아서 다시 렌더링 */}
        </Col>
      </Row>
    </div>
  );

  return (
    <div style={{ padding: '30px' }}>
      <Card
        title={PlayerInfo( member, pileCards )}
        bordered={false}
        style={{ width: 300, borderColor: member.turn ? 'skyblue' : '' }}
      >
        <DeckList
          member={member}
          pileCards={pileCards}
        />
      </Card>
    </div>
  );
};

export default Player;
