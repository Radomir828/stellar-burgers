import { burgerConstructorSlice } from './slices/constructor';
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { combineSlices } from '@reduxjs/toolkit';
import { ingredientSlice } from './slices/ingredients';
import { feedSlice } from './slices/feed';
import { userSlice } from './slices/users';
import { ordersSlice } from './slices/orders';
import { orderSlice } from './slices/order';

export const rootReducer = combineSlices(
  ingredientSlice,
  burgerConstructorSlice,
  feedSlice,
  userSlice,
  ordersSlice,
  orderSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
