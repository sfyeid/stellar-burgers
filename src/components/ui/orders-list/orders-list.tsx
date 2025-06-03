import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrderListUIProps } from './type';
import { OrderCard } from '@components';

export const OrderListUI: FC<OrderListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
