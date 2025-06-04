import { getOrderByNumberApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type orderState = {
  data: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: orderState = {
  data: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    if (!response.success) {
      throw new Error('Failed to fetch order');
    }
    return response.orders[0];
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state: orderState) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { getOrder } = orderSlice.selectors;
