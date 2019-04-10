import React from 'react';

import { Button as Btn } from 'antd';

const Button = ( { type, children } ) => {
  return <Btn type={type}>{children}</Btn>;
};

export default Button;
