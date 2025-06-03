import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectFeed } from '../../slices/feed-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInf: FC = () => {
  const feed = useSelector(selectFeed);
  const orders = feed?.orders || [];

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
