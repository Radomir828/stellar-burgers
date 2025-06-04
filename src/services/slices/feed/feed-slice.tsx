import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

interface FeedState {
  data: TOrdersData;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: FeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state: FeedState) => state.data,
    getFeedOrders: (state: FeedState) => state.data.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const { getFeed, getFeedOrders } = feedSlice.selectors;
