import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '@cookie';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type userState = {
  data: TUser; // данные пользователя, null если не авторизован
  isUserChecked: boolean;
  isUserAuthorised: boolean;

  // проверка токена
  userCheckLoading: boolean;
  userCheckError: SerializedError | null;

  // регистрация
  userRegisterLoading: boolean;
  userRegisterError: SerializedError | null;

  // логин
  userLoginLoading: boolean;
  userLoginError: SerializedError | null;
};

const initialState: userState = {
  data: {
    name: '',
    email: ''
  },
  isUserAuthorised: false,
  isUserChecked: false,

  userCheckLoading: false,
  userCheckError: null,

  userRegisterLoading: false,
  userRegisterError: null,

  userLoginError: null,
  userLoginLoading: false
};

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (data: Partial<TRegisterData>, { dispatch }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      throw new Error('Failed to update user data');
    }
    dispatch(userSlice.actions.userUpdate(response.user));
    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    const response = await logoutApi();
    if (!response.success) {
      throw new Error('Failed to logout user');
    }
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userSlice.actions.userLogout());
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData) => {
    const response = await loginUserApi(userData);
    if (!response.success) {
      throw new Error('Failed to login user');
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);
    if (!response.success) {
      throw new Error('Failed to register user');
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const fetchUser = createAsyncThunk('user/fethcUser', async () => {
  const response = await getUserApi();
  if (!response.success) {
    throw new Error('Failed to fetch user data');
  }
  return response.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = {
        name: '',
        email: ''
      };
      state.isUserAuthorised = false;
    },
    userUpdate: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
      state.isUserAuthorised = true;
    }
  },
  selectors: {
    getUserState: (state: userState) => state,
    getUser: (state: userState) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userCheckLoading = true;
        state.userCheckError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.isUserChecked = true;
        state.isUserAuthorised = true;
        state.userCheckLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userCheckLoading = false;
        state.isUserChecked = true;
        state.userCheckError = action.error;
        state.isUserAuthorised = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.userRegisterLoading = true;
        state.userRegisterError = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.data = action.payload;
          state.userRegisterLoading = false;
          state.isUserAuthorised = true;
          state.userCheckError = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.userRegisterLoading = false;
        state.userRegisterError = action.error;
        // state.userRegisterError = action.meta.rejectedWithValue
        //   ? (action.payload as SerializedError)
        //   : action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.userLoginLoading = true;
        state.userLoginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.userLoginLoading = false;
        state.isUserAuthorised = true;
        state.userLoginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoginLoading = false;
        state.userLoginError = action.error;
        // state.userLoginError = action.meta.rejectedWithValue
        //   ? (action.payload as SerializedError)
        //   : action.error;
      });
  }
});

export const { getUserState, getUser } = userSlice.selectors;
