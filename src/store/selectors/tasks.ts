import type { Task } from '../slices/tasks';
import type { Selector } from '../types/redux';

export const getTasks: Selector<Task[]> = (state): Task[] => state.task.tasks;

export const getTasksLoading: Selector<boolean> = (state): boolean => state.task.loading;
