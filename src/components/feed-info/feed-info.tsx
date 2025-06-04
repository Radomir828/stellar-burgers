import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import { getFeed, getFeedOrders } from '../../services/slices/feed';
import { fetchOrders, getOrders } from '../../services/slices/orders/orders';

const getOrders_ = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getFeedOrders);
  const feed = useSelector(getFeed);
  const readyOrders = getOrders_(orders, 'done');
  // console.log(readyOrders);

  const pendingOrders = getOrders_(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
