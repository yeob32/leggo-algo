import React from 'react';
import { doesNotReject } from 'assert';

interface Props {
  text: string;
  done: boolean;
  onToggle(): void;
  onRemove(): void;
}

let t: Array<string> = new Array<string>();
console.log(t);

const TodoItem: React.SFC<Props> = ({ onToggle, done, text, onRemove }) => {
  return (
    <li>
      {console.log(t)}
      <b
        onClick={onToggle}
        style={{
          textDecoration: done ? 'line-through' : 'none',
        }}
      >
        {text}
      </b>

      <button style={{ all: 'unset', marginLeft: '0.5rem' }} onClick={onRemove}>
        [지우기]
      </button>
    </li>
  );
};

export default TodoItem;
