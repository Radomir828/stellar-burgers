import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { getIngredients } from '../../services/slices/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/services/store';
import { getOrders } from '../../services/slices/orders';
import { getFeed } from '../../services/slices/feed';
import {
  fetchOrderByNumber,
  getOrder
} from '../../services/slices/order/order-slice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);
  const feed = useSelector(getFeed);
  const order = useSelector(getOrder);
  const id = useParams().number;

  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(id)));
  }, [dispatch, id]);

  const orderData = useMemo(() => {
    if (orders.length) {
      const data = orders.find((order) => String(order.number) === id);
      if (data) return data;
    }
    if (feed.orders.length) {
      const data = feed.orders.find((order) => String(order.number) === id);
      if (data) return data;
    }

    if (order && String(order.number) === id) {
      return order;
    }
  }, [orders, feed.orders, order, id]);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
