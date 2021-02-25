import React from 'react';
import { Button as AButton, ButtonProps } from 'antd';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <AButton {...rest}>{children}</AButton>;
};

export default Button;
