import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface ToDoItem {
  id: number;
  text: string;
}

export interface CounterSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
  toDoList: ToDoItem[];
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
  toDoList: [],
};

export const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1;
    }),
    decrement: create.reducer(state => {
      state.value -= 1;
    }),
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
    // ),
  }),
  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
});

export const { decrement, increment } = counterSlice.actions;

export const { selectCount, selectStatus } = counterSlice.selectors;
