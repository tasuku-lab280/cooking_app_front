import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type currentUserState = {
  id: number | null;
  email: string;
  nickname: string;
  image: string;
  isLoggedIn: boolean;
};

const initialState: currentUserState = {
  id: null,
  email: '',
  nickname: '',
  image: '',
  isLoggedIn: false,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<currentUserState>) => {
      const { id, email, nickname, image } = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.image = image;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
