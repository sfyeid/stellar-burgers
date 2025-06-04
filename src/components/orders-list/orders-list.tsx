import { FC, memo } from 'react';

import { OrderListProps } from './type';
import { OrderListUI } from '@ui';

export const OrderList: FC<OrderListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrderListUI orderByDate={orderByDate} />;
});
