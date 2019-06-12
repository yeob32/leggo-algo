import React from 'react';
import { Statistic, Row, Col } from 'antd';

const Countdown = Statistic.Countdown;
// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
const deadline = Date.now() + 1000 * 60 * 3;
const deadBoard = '제한시간 : ';

function onFinish() {
  console.log( 'finished!' );
}

const DefaultCountdown = () => {
  return (
    <Countdown
      style={{ float: 'right' }}
      value={deadline}
      onFinish={onFinish}
      format="mm:ss:SSS"
    />
  );
};

export default DefaultCountdown;
