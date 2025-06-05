import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientState {
  loading: boolean;
  error: SerializedError | null;
  ingredients: TIngredient[];
}
const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoadingInfo: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = null;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  }
});

export const { getIngredients, getLoadingInfo } = ingredientSlice.selectors;
// export default ingredientSlice.reducer;
