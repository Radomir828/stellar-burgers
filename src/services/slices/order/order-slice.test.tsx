import { orderSlice, fetchOrderByNumber } from './order-slice';
import { TOrder } from '@utils-types';

const initialState = orderSlice.getInitialState();

const mockOrder: TOrder = {
  _id: 'order123',
  ingredients: ['item1', 'item2'],
  status: 'done',
  name: 'Тест заказ',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  number: 9999
};

describe('orderSlice reducer', () => {
  it('должен установить isLoading=true при fetchOrderByNumber.pending', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.pending('', 9999)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('должен сохранить заказ и isLoading=false при fetchOrderByNumber.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.fulfilled(mockOrder, '', 9999)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(mockOrder);
  });

  it('должен сохранить ошибку и isLoading=false при fetchOrderByNumber.rejected', () => {
    const error = new Error('Ошибка загрузки заказа');
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.rejected(error, '', 9999)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error?.message).toBe(error.message);
  });
});
