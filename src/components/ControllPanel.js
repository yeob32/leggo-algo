import React from 'react';

import { Button } from 'antd';

const StartButton = ( start ) => (
  <Button size="large" onClick={start} style={{ marginRight: '8px' }}>
        Start
  </Button>
)

const ControllPanel = ( { deal, start, join } ) => {
  console.log( 'deal > ', deal );

  return (
    <div>
      {
        deal ? '' : (
          <Button type="primary" size="large" onClick={start} style={{ marginRight: '8px' }}>
        Start
          </Button>
 )
        }
      <Button type="primary" size="large" onClick={join} style={{ marginRight: '8px' }}>
        Join
      </Button>
    </div>
  );
};

export default ControllPanel;
