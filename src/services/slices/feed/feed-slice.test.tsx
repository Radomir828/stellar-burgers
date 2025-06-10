import { feedSlice, fetchFeed } from './feed-slice';
import { TOrdersData } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';
import { TFeedsResponse } from '@api';

// import { TFeedsResponse} from

describe('feedSlice reducer', () => {
  const initialState = feedSlice.getInitialState();

  it('должен установить loading в true при fetchFeed.pending', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('должен сохранить данные при fetchFeed.fulfilled', () => {
    const mockData: TOrdersData = {
      orders: [
        {
          _id: '1',
          ingredients: ['643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Готовый бургер',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          number: 123
        }
      ],
      total: 42,
      totalToday: 10
    };

    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(mockData, '', undefined)
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(mockData);
  });

  it('должен сохранить ошибку при fetchFeed.rejected', () => {
    const error = 'fetchFeeds rejected';

    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.rejected(new Error(error), 'rejected')
    );

    expect(nextState.loading).toBeFalsy();
    expect(nextState.error?.message).toEqual(error);
  });
});
