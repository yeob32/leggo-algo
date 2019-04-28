import React from 'react';

import { Button } from 'antd';

const StartButton = start => (
  <Button size="large" onClick={start} style={{ marginRight: '8px' }}>
    Start
  </Button>
);

const ControllPanel = ( { deal, start, join, host } ) => {
  const showButton = host && !deal;

  return (
    <div>
      {showButton ? (
        <Button type="primary" size="large" onClick={start} style={{ marginRight: '8px' }}>
          시작
        </Button>
      ) : (
        ''
      )}
      <Button type="primary" size="large" onClick={join} style={{ marginRight: '8px' }}>
        참가
      </Button>
    </div>
  );
};

export default ControllPanel;
