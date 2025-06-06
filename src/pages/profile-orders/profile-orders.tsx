import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchOrders,
  getOrders,
  getOrderState
} from '../../services/slices/orders/orders';
import { AppDispatch } from '@store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const orders = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
