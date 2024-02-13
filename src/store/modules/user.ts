import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FullUser = {
  id: number | null;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserInitialState = {
  user: FullUser | null;
  loading: boolean;
};

const initialState: UserInitialState = {
  user: null,
  loading: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    tryLogiin: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    successLogin: (state, action: PayloadAction<FullUser>) => {
      state.loading = false;
      state.user = action.payload;
    },
    failLogin: (state, action: PayloadAction) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export default user.reducer;
export const userActions = user.actions;
