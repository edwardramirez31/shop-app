import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DjangoTask {
  text: string;
  completed: boolean;
  id: number;
}

export interface Task {
  text: string;
  completed: boolean;
  id: number;
  isUpdating: boolean;
}

interface InitialState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, _action: PayloadAction<{ text: string; completed: boolean }>) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action: PayloadAction<DjangoTask>) => {
      // { id: 1, text: "Hello", completed: false }
      state.tasks = [...state.tasks, { ...action.payload, isUpdating: false }];
      state.loading = false;
    },
    addTaskError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTask: (state) => {
      state.loading = true;
    },
    getTaskSuccess: (state, action: PayloadAction<Array<DjangoTask>>) => {
      // { id: 1, text: "Hello", completed: false }
      const tasks = action.payload.map((item) => ({ ...item, isUpdating: false }));
      state.tasks = [...state.tasks, ...tasks];
      state.loading = false;
    },
    getTaskError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setIsUpdating: (state, action: PayloadAction<number>) => {
      const newTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, isUpdating: true } : task
      );
      state.tasks = newTasks;
    },
    updateTask: (state, _action: PayloadAction<DjangoTask>) => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action: PayloadAction<DjangoTask>) => {
      const task = action.payload;
      const newTasks = state.tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...task,
            isUpdating: false,
          };
        }
        return item;
      });
      state.tasks = newTasks;
      state.loading = false;
    },
  },
});

export const {
  addTask,
  addTaskSuccess,
  addTaskError,
  getTask,
  getTaskSuccess,
  getTaskError,
  removeTask,
  setIsUpdating,
  updateTask,
  updateTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;
