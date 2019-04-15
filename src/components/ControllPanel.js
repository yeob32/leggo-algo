import React from 'react';

import { Button } from 'antd';

const ControllPanel = ( { additionUser, dealCard, join } ) => {
  return (
    <div>
      <Button size="large" onClick={() => dealCard()} style={{ marginRight: '8px' }}>
        Start
      </Button>
      <Button type="primary" size="large" onClick={() => join()} style={{ marginRight: '8px' }}>
        Join
      </Button>
    </div>
  );
};

export default ControllPanel;
