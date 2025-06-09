import { userSlice, fetchUser, registerUser, loginUser } from './user-slice';
import { TUser } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = userSlice.getInitialState();

describe('userSlice reducer', () => {
  const mockUser: TUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  // const mockError: SerializedError = {
  //   name: 'Error',
  //   message: 'Ошибка авторизации'
  // };

  // FETCH USER
  it('должен установить флаг загрузки при fetchUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      fetchUser.pending('', undefined)
    );
    expect(nextState.userCheckLoading).toBe(true);
    expect(nextState.userCheckError).toBeNull();
  });

  it('должен сохранить данные пользователя при fetchUser.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      fetchUser.fulfilled(mockUser, '', undefined)
    );
    expect(nextState.data).toEqual(mockUser);
    expect(nextState.isUserAuthorised).toBe(true);
    expect(nextState.isUserChecked).toBe(true);
    expect(nextState.userCheckLoading).toBe(false);
  });

  it('должен сохранить ошибку при fetchUser.rejected', () => {
    const error = 'fetchUser rejected';

    const nextState = userSlice.reducer(
      initialState,
      fetchUser.rejected(new Error(error), '', undefined)
    );
    expect(nextState.userCheckLoading).toBe(false);
    expect(nextState.userCheckError?.message).toEqual(error);
    expect(nextState.isUserChecked).toBe(true);
    expect(nextState.isUserAuthorised).toBe(false);
  });

  // REGISTER USER
  it('должен установить флаг загрузки при registerUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      registerUser.pending('', {} as any)
    );
    expect(nextState.userRegisterLoading).toBe(true);
    expect(nextState.userRegisterError).toBeNull();
  });

  it('должен сохранить данные пользователя при registerUser.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(mockUser, '', {} as any)
    );
    expect(nextState.data).toEqual(mockUser);
    expect(nextState.userRegisterLoading).toBe(false);
    expect(nextState.userRegisterError).toBeNull();
    expect(nextState.isUserAuthorised).toBe(true);
  });

  it('должен сохранить ошибку при registerUser.rejected', () => {
    const error = 'registerUser rejected';

    const nextState = userSlice.reducer(
      initialState,
      registerUser.rejected(new Error(error), '', {} as any)
    );
    expect(nextState.userRegisterLoading).toBe(false);
    expect(nextState.userRegisterError?.message).toEqual(error);
  });

  // LOGIN USER
  it('должен установить флаг загрузки при loginUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      loginUser.pending('', {} as any)
    );
    expect(nextState.userLoginLoading).toBe(true);
    expect(nextState.userLoginError).toBeNull();
  });

  it('должен сохранить данные пользователя при loginUser.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(mockUser, '', {} as any)
    );
    expect(nextState.data).toEqual(mockUser);
    expect(nextState.userLoginLoading).toBe(false);
    expect(nextState.userLoginError).toBeNull();
    expect(nextState.isUserAuthorised).toBe(true);
  });

  it('должен сохранить ошибку при loginUser.rejected', () => {
    const error = 'fetchUser.rejected';
    const nextState = userSlice.reducer(
      initialState,
      loginUser.rejected(new Error(error), '', {} as any)
    );
    expect(nextState.userLoginLoading).toBe(false);
    expect(nextState.userLoginError?.message).toEqual(error);
  });
});
