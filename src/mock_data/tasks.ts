import type { DjangoTask, Task } from '../store/slices/tasks';

export const MOCKED_INCOMPLETED_TASKS: Task[] = [
  { text: 'TO DO MOCK', completed: false, id: 1, isUpdating: false },
  { text: 'TO DO MOCK 2', completed: false, id: 2, isUpdating: false },
  { text: 'TO DO MOCK 3', completed: false, id: 3, isUpdating: false },
];

export const MOCKED_COMPLETED_TASKS: Task[] = [
  { text: 'TO DO MOCK', completed: true, id: 1, isUpdating: false },
  { text: 'TO DO MOCK 2', completed: true, id: 2, isUpdating: false },
  { text: 'TO DO MOCK 3', completed: true, id: 3, isUpdating: false },
];

export const MOCKED_TASK: Task = { text: 'TO DO MOCK', completed: false, id: 1, isUpdating: false };

export const MOCKED_COMPLETED_TASK: Task = {
  text: 'TO DO MOCK',
  completed: true,
  id: 1,
  isUpdating: true,
};

export const MOCKED_COMPLETED_TASK_NOT_UPDATING: Task = {
  text: 'TO DO MOCK',
  completed: true,
  id: 1,
  isUpdating: false,
};

export const MOCKED_COMPLETED_DJANGO_TASK: DjangoTask = {
  text: 'TO DO MOCK',
  completed: true,
  id: 1,
};

export const MOCKED_INCOMPLETED_DJANGO_TASK: DjangoTask = {
  text: 'TO DO MOCK',
  completed: false,
  id: 1,
};

export const MOCKED_COMPLETED_DJANGO_TASKS: DjangoTask[] = [
  {
    text: 'TO DO MOCK',
    completed: true,
    id: 1,
  },
  {
    text: 'TO DO MOCK 2',
    completed: true,
    id: 2,
  },
  {
    text: 'TO DO MOCK 3',
    completed: true,
    id: 3,
  },
];
