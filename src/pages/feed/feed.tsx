import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, getFeed, getFeedOrders } from '../../services/slices/feed';
import type { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedOrders);
  const dispatch = useDispatch<AppDispatch>();
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
