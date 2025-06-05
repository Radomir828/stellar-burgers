import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchFeed, getFeed, getFeedOrders } from '../../services/slices/feed';
import type { AppDispatch } from '@store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
