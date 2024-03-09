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

const tasksLocalStorageKey = "todo";

const getTasksDataFromLocalStorage = (): ToDoItem[] => {
  const tasks = localStorage.getItem(tasksLocalStorageKey);

  if (!tasks?.length) return [];
  return JSON.parse(tasks);
};

const setTasksDataToLocalStorage = (data: ToDoItem[]): void => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(tasksLocalStorageKey, jsonData);
};

const initialState: CounterSliceState = {
  idValue: Math.floor(Math.random() * 9_999),
  toDoList: getTasksDataFromLocalStorage(),
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

      setTasksDataToLocalStorage(state.toDoList);
    }),

    removeTask: create.reducer((state, action: PayloadAction<number>) => {
      state.toDoList = state.toDoList.filter(el => el.id !== action.payload);

      setTasksDataToLocalStorage(state.toDoList);
    }),

    updateTextTask: create.reducer(
      (state, action: PayloadAction<{ id: number; text: string }>) => {
        if (!action.payload.id) return;
        const elem = state.toDoList.findIndex(
          el => el.id === action.payload.id,
        );

        state.toDoList[elem].text = action.payload.text;

        setTasksDataToLocalStorage(state.toDoList);
      },
    ),

    updateStatusTask: create.reducer(
      (state, action: PayloadAction<{ id: number; idDone: boolean }>) => {
        if (!action.payload.id) return;
        const elem = state.toDoList.findIndex(
          el => el.id === action.payload.id,
        );

        state.toDoList[elem].isDone = !state.toDoList[elem].isDone;

        setTasksDataToLocalStorage(state.toDoList);
      },
    ),

    saveDragPosition: create.reducer(
      (state, action: PayloadAction<ToDoItem[]>) => {
        state.toDoList = action.payload;

        setTasksDataToLocalStorage(state.toDoList);
      },
    ),
  }),

  selectors: {
    selectToDoList: toDoList => toDoList.toDoList,
  },
});

export const {
  addTask,
  removeTask,
  updateTextTask,
  updateStatusTask,
  saveDragPosition,
} = toDoSlice.actions;

export const { selectToDoList } = toDoSlice.selectors;
