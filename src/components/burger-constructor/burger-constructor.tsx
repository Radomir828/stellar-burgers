import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConstructorItems,
  resetConstructor
} from '../../services/slices/constructor';
import {
  createOrder,
  getIsNewOrderLoading,
  getOrderModalData,
  resetOrderModalData
} from '../../services/slices/orders/orders';
import { AppDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { getUserState } from '../../services/slices/users';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  /** TODO(done): взять переменные constructorItems(done), orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getIsNewOrderLoading);

  const orderModalData = useSelector(getOrderModalData);

  const { isUserAuthorised } = useSelector(getUserState);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isUserAuthorised) {
      navigate('/login');
      return;
    }

    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i: TConstructorIngredient) => i._id)
    ];
    dispatch(createOrder(data));
  };

  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(resetOrderModalData());
      dispatch(resetConstructor());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
