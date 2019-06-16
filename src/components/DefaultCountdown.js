import React, { useState } from 'react';
import { Statistic, Row, Col, Button } from 'antd';

const Countdown = Statistic.Countdown;
// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
const deadline = Date.now() + 1000 * 60 * 3;
const deadBoard = '제한시간 : ';

function onFinish() {
  console.log( 'finished!' );
}

const DefaultCountdown = () => {
  const [ count, setCount ] = useState( 0 );

  const test = () => {
    setCount( 0 );
  };

  const test2 = () => {
    console.log( 'deadline > ', deadline );
    setCount( deadline );
  };

  const CountdownComponent = (
    <Countdown
      style={{ float: 'right' }}
      value={count}
      onFinish={onFinish}
      format="mm:ss:SSS"
    />
  );

  return (
    <div>
      <Button
        type="danger"
        onClick={test}
      >
        gjgj
      </Button>

      <Button
        type="danger"
        onClick={test2}
      >
        zzzzzzzz
      </Button>
      {CountdownComponent}
    </div>
  );
};

export default DefaultCountdown;
