import {
  Action,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

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
  error: null | number;
};

const initialState: UserInitialState = {
  user: null,
  loading: false,
  error: null,
};

// export const asyncFetchUser = createAsyncThunk(
//   'user/asyncFetchUser',
//   async (id: number) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     const data: FullUser = await res.json();
//     console.log('data: ', data);
//     return data;
//   }
// );

export const asyncFetchUser = createAsyncThunk(
  'user/asyncFetchUser',
  async (id: number, { rejectWithValue }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (res.ok) {
      const data: FullUser = await res.json();
      console.log('data: ', data);
      return data;
    } else {
      return rejectWithValue(res.status);
    }
  }
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchUser.pending, (state, action) => {
      console.log('pending');
      state.loading = true;
    });
    builder.addCase(
      asyncFetchUser.fulfilled,
      (state, action: PayloadAction<FullUser>) => {
        console.log('fulfilled');
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(asyncFetchUser.rejected, (state, action) => {
      console.log('rejected', action.payload);
      state.loading = false;
      state.user = null;
      if (typeof action.payload === 'number') {
        state.error = action.payload;
      }
    });
  },
});

export default user.reducer;
export const userActions = user.actions;
