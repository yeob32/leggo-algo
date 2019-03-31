import React from 'react';

import { Popconfirm, Popover, message, Icon, Button } from 'antd';

interface Props {
  piles: [{ id: string; name: string }];
  deck: { id: string; name: string; flip: boolean };
}

const Deck: React.SFC<Props> = ({ deck, piles }) => {
  const confirm = (e: any) => {
    console.log(e);
    message.success('맞춤');
  };

  function cancel(e: any) {
    console.log(e);
    message.error('틀렸다네');
  }

  const content = piles.map(pile => (
    <Popconfirm
      title="Do you want to select this card?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
      key={pile.id}
    >
      <Button key={pile.id}>{pile.name}</Button>
    </Popconfirm>
  ));

  return (
    <Popover content={content} title="카드 선택" trigger="click">
      <Button>{deck.flip ? deck.name : <Icon type="smile" />}</Button>
    </Popover>
  );
};

export default Deck;
