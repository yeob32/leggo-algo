import React from 'react';

import { Card } from 'antd';
import Cards from '../components/Card';

const Stack = ( { pileCards } ) => {
  return (
    <Card title="남은 카드">
      {pileCards.map( ps => (
        <Cards card={ps} key={ps.id} />
      ) )}
    </Card>
  );
};

export default Stack;
