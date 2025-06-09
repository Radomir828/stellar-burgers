import {
  ordersSlice,
  createOrder,
  fetchOrders,
  resetOrderModalData
} from './orders';
import { TOrder } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = ordersSlice.getInitialState();

const mockOrder: TOrder = {
  _id: '123',
  ingredients: ['abc', 'def'],
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 1
};

describe('ordersSlice reducer', () => {
  it('должен установить isNewOrderLoading в true при createOrder.pending', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.pending('', ['1', '2'])
    );
    expect(nextState.isNewOrderLoading).toBe(true);
    expect(nextState.newOrderError).toBeNull();
  });

  it('должен сохранить заказ в модалку и сбросить флаг загрузки при createOrder.fulfilled', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.fulfilled(mockOrder, '', ['1', '2'])
    );
    expect(nextState.orderModalData).toEqual(mockOrder);
    expect(nextState.isNewOrderLoading).toBe(false);
  });

  it('должен сохранить ошибку и сбросить флаг загрузки при createOrder.rejected', () => {
    const error = new Error('Ошибка создания');
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.rejected(error, '', ['1', '2'])
    );
    expect(nextState.isNewOrderLoading).toBe(false);
    expect(nextState.newOrderError?.message).toBe(error.message);
  });

  it('должен установить ordersLoading в true при fetchOrders.pending', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.pending('', undefined)
    );
    expect(nextState.ordersLoading).toBe(true);
    expect(nextState.ordersError).toBeNull();
  });

  it('должен сохранить список заказов и сбросить ordersLoading при fetchOrders.fulfilled', () => {
    const orders: TOrder[] = [mockOrder];
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.fulfilled(orders, '', undefined)
    );
    expect(nextState.data).toEqual(orders);
    expect(nextState.ordersLoading).toBe(false);
  });

  it('должен сохранить ошибку и сбросить флаг загрузки при fetchOrders.rejected', () => {
    const error = new Error('Ошибка загрузки');
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.rejected(error, '', undefined)
    );
    expect(nextState.ordersLoading).toBe(false);
    expect(nextState.ordersError?.message).toBe(error.message);
  });

  it('должен сбрасывать orderModalData при resetOrderModalData', () => {
    const modifiedState = {
      ...initialState,
      orderModalData: mockOrder
    };
    const nextState = ordersSlice.reducer(modifiedState, resetOrderModalData());
    expect(nextState.orderModalData).toBeNull();
  });
});
