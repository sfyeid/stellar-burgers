import React, { FC } from 'react';
import { OrderStatUIProps } from './type';

export const OrderStatUI: FC<OrderStatUIProps> = ({ textStyle, text }) => (
  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
);
