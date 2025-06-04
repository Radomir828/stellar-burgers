import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  getOrders,
  getOrderState
} from '../../services/slices/orders/orders';
import { AppDispatch } from 'src/services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const orders = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
