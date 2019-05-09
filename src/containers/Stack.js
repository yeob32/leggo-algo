import React from 'react';

import { connect } from 'react-redux';

import { Card } from 'antd';
import Cards from '../components/Card';

class Stack extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {};
  }

  render() {
    const { pileCards } = this.props;

    return (
      <Card title="남은 카드">
        {pileCards.map( ps => (
          <Cards card={ps} key={ps.id} />
        ) )}
      </Card>
    );
  }
}

export default connect( state => state )( Stack );
