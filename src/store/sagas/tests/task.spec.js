import { expectSaga } from 'redux-saga-test-plan';

import rootSaga from '..';
import { rootReducer } from '../..';
import DjangoTodo from '../../../apis/djangoTodo';
import {
  MOCKED_COMPLETED_DJANGO_TASK,
  MOCKED_COMPLETED_DJANGO_TASKS,
  MOCKED_COMPLETED_TASKS,
  MOCKED_INCOMPLETED_DJANGO_TASK,
  MOCKED_TASK,
} from '../../../mock_data/tasks';
import {
  addTask,
  addTaskError,
  addTaskSuccess,
  getTask,
  getTaskError,
  getTaskSuccess,
  removeTask,
  updateTask,
  updateTaskSuccess,
} from '../../slices/tasks';

describe('Tags sagas CRUD testing', () => {
  describe('addTaskSaga testing', () => {
    const mockedCreateTask = jest
      .spyOn(DjangoTodo, 'createTask')
      .mockImplementation(() => ({ ...MOCKED_TASK }));

    beforeEach(() => {
      mockedCreateTask.mockClear();
    });
    const state = { ...rootReducer(undefined, {}) };
    const errorMessage = 'MOCKED ERROR';
    it('should create a task at the api', async () => {
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(addTask(MOCKED_COMPLETED_DJANGO_TASK))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.createTask,
          args: [MOCKED_COMPLETED_DJANGO_TASK],
        })
        .put(addTaskSuccess(MOCKED_TASK))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            tasks: [MOCKED_TASK],
          },
        })
        .silentRun();

      expect(mockedCreateTask).toHaveBeenCalledTimes(1);
    });

    it('create task saga should fail', async () => {
      mockedCreateTask.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(addTask(MOCKED_COMPLETED_DJANGO_TASK))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.createTask,
          args: [MOCKED_COMPLETED_DJANGO_TASK],
        })
        .put(addTaskError(errorMessage))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            error: errorMessage,
            loading: false,
          },
        })
        .silentRun();

      expect(mockedCreateTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTaskSaga testing', () => {
    const mockedGetTasks = jest
      .spyOn(DjangoTodo, 'getTasks')
      .mockImplementation(() => [...MOCKED_COMPLETED_DJANGO_TASKS]);

    beforeEach(() => {
      mockedGetTasks.mockClear();
    });
    const state = { ...rootReducer(undefined, {}) };
    const errorMessage = 'MOCKED ERROR';
    it('should get tasks from the api', async () => {
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(getTask())
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.getTasks,
        })
        .put(getTaskSuccess([...MOCKED_COMPLETED_DJANGO_TASKS]))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            tasks: [...MOCKED_COMPLETED_TASKS],
            loading: false,
          },
        })
        .silentRun();

      expect(mockedGetTasks).toHaveBeenCalledTimes(1);
    });

    it('get task saga should fail', async () => {
      mockedGetTasks.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(getTask())
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.getTasks,
        })
        .put(getTaskError(errorMessage))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            error: errorMessage,
            loading: false,
          },
        })
        .silentRun();

      expect(mockedGetTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeTaskSaga testing', () => {
    const mockedRemoveTasks = jest.spyOn(DjangoTodo, 'deleteTask').mockImplementation(() => {});

    beforeEach(() => {
      mockedRemoveTasks.mockClear();
    });
    const state = {
      ...rootReducer(
        { task: { tasks: [...MOCKED_COMPLETED_TASKS], loading: false, error: null } },
        {}
      ),
    };
    const errorMessage = 'MOCKED ERROR';
    const taskId = 1;
    it('should remove task from the api', async () => {
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(removeTask(taskId))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.deleteTask,
          args: [taskId],
        })
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            tasks: [...MOCKED_COMPLETED_TASKS.slice(1)],
          },
        })
        .silentRun();

      expect(mockedRemoveTasks).toHaveBeenCalledTimes(1);
    });

    it('remove task saga should fail', async () => {
      mockedRemoveTasks.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(removeTask(taskId))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.deleteTask,
          args: [taskId],
        })
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            tasks: [...MOCKED_COMPLETED_TASKS.slice(1)],
          },
        })
        .silentRun();

      expect(mockedRemoveTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTaskSaga testing', () => {
    const mockedUpdateTask = jest
      .spyOn(DjangoTodo, 'updateTask')
      .mockImplementation(() => ({ ...MOCKED_INCOMPLETED_DJANGO_TASK }));

    beforeEach(() => {
      mockedUpdateTask.mockClear();
    });
    const state = {
      ...rootReducer(
        { task: { tasks: [...MOCKED_COMPLETED_TASKS], loading: false, error: null } },
        {}
      ),
    };
    const errorMessage = 'MOCKED ERROR';
    const { id, ...rest } = MOCKED_INCOMPLETED_DJANGO_TASK;
    it('should update task at api', async () => {
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(updateTask(MOCKED_INCOMPLETED_DJANGO_TASK))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.updateTask,
          args: [id, { ...rest }],
        })
        .put(updateTaskSuccess({ ...MOCKED_INCOMPLETED_DJANGO_TASK }))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            tasks: [MOCKED_TASK, ...MOCKED_COMPLETED_TASKS.slice(1)],
            loading: false,
          },
        })
        .silentRun();

      expect(mockedUpdateTask).toHaveBeenCalledTimes(1);
    });

    it('update task saga should fail', async () => {
      mockedUpdateTask.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(updateTask(MOCKED_INCOMPLETED_DJANGO_TASK))
        .call.like({
          context: DjangoTodo,
          fn: DjangoTodo.updateTask,
          args: [id, { ...rest }],
        })
        .put(getTaskError(errorMessage))
        .hasFinalState({
          ...state,
          task: {
            ...state.task,
            error: errorMessage,
            loading: false,
          },
        })
        .silentRun();

      expect(mockedUpdateTask).toHaveBeenCalledTimes(1);
    });
  });
});
