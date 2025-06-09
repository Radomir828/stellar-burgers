import { rootReducer } from './store';
import { burgerConstructorSlice } from './slices/constructor';
import { ingredientSlice } from './slices/ingredients';
import { feedSlice } from './slices/feed';
import { userSlice } from './slices/users';
import { ordersSlice } from './slices/orders';
import { orderSlice } from './slices/order';

describe('Тестирование rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const initialState = {
      [ingredientSlice.name]: ingredientSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, unknownAction);

    expect(result).toEqual(initialState);
  });
});
