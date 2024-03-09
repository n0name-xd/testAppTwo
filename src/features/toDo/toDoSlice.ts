import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface ToDoItem {
  id: number;
  text: string;
  isDone: boolean;
}

export interface CounterSliceState {
  idValue: number;
  toDoList: ToDoItem[];
}

const initialState: CounterSliceState = {
  idValue: 1,
  toDoList: [],
};

export const toDoSlice = createAppSlice({
  name: "toDo",
  initialState,
  reducers: create => ({
    addTask: create.reducer((state, action: PayloadAction<string>): void => {
      state.toDoList.unshift({
        text: action.payload,
        id: state.idValue++,
        isDone: false,
      });
    }),

    removeTask: create.reducer((state, action: PayloadAction<number>) => {
      state.toDoList = state.toDoList.filter(el => el.id !== action.payload);
    }),

    updateTextTask: create.reducer(
      (state, action: PayloadAction<{ id: number; text: string }>) => {
        if (!action.payload.id) return;
        const elem = state.toDoList.findIndex(
          el => el.id === action.payload.id,
        );

        state.toDoList[elem].text = action.payload.text;
      },
    ),

    updateStatusTask: create.reducer(
      (state, action: PayloadAction<{ id: number; idDone: boolean }>) => {
        if (!action.payload.id) return;
        const elem = state.toDoList.findIndex(
          el => el.id === action.payload.id,
        );

        state.toDoList[elem].isDone = !state.toDoList[elem].isDone;
      },
    ),
  }),

  selectors: {
    selectToDoList: toDoList => toDoList.toDoList,
  },
});

export const { addTask, removeTask, updateTextTask, updateStatusTask } =
  toDoSlice.actions;

export const { selectToDoList } = toDoSlice.selectors;
