import React from 'react';

import { Card, Avatar, Row, Col, Icon, Button } from 'antd';

import DeckList from '../containers/DeckList';
import socketUtils from '../utils/socketUtil';

const colorList = [ '#f56a00', '#7265e6', '#ffbf00', '#00a2ae' ];

const Player = ( { member, pileCards, discardHolder, session } ) => {
  const myTurn = member.id === session.id;
  const disabled = session.auth.random;
  const showRandomCardButton = member.turn && myTurn;

  const getRandomCard = id => {
    if ( pileCards ) {
      socketUtils().emit( 'action-random', { id } );
      // return pileCards[0];
    }
  };

  const PlayerInfo = () => (
    <div>
      <Row>
        <Col span={12}>
          <Avatar
            style={{ backgroundColor: colorList[member.order], verticalAlign: 'middle' }}
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
            {showRandomCardButton ? (
              <Button
                type="primary"
                disabled={disabled}
                onClick={() => getRandomCard( member.id )}
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
        title={PlayerInfo()}
        bordered={false}
        style={{ width: 300, borderColor: member.turn ? 'skyblue' : '' }}
      >
        <DeckList
          member={member}
          pileCards={pileCards}
          discardHolder={discardHolder}
        />
      </Card>
    </div>
  );
};

export default Player;
