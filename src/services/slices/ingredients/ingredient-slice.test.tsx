import { fetchIngredients, ingredientSlice } from './ingredient-slice'; // путь уточни по своему проекту
import { TIngredient } from '@utils-types';

describe('ingredientSlice reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('устанавливает loading = true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fetchIngredients.fulfilled', () => {
    const mockData: TIngredient[] = [
      {
        _id: '123',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 15,
        calories: 200,
        price: 100,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('сохраняет ошибку при fetchIngredients.rejected', () => {
    const mockError = {
      message: 'Ошибка получения',
      name: 'Error'
    };
    const action = {
      type: fetchIngredients.rejected.type,
      error: mockError
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(mockError);
  });
});
