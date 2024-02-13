import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CounterInitalState = {
  count: number;
};

const initialState: CounterInitalState = {
  count: 0,
};

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction) => {
      state.count += 1;
    },
    decrement: (state, action: PayloadAction) => {
      state.count -= 1;
    },
  },
});

export const counterActions = counter.actions;
export default counter.reducer;
