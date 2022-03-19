import {
  MOCKED_COMPLETED_DJANGO_TASK,
  MOCKED_COMPLETED_TASK_NOT_UPDATING,
  MOCKED_COMPLETED_TASK,
  MOCKED_INCOMPLETED_TASKS,
  MOCKED_COMPLETED_TASKS,
  MOCKED_TASK,
} from '../../../mock_data/tasks';
import reducer, {
  initialState,
  addTask,
  addTaskSuccess,
  addTaskError,
  getTask,
  getTaskSuccess,
  getTaskError,
  removeTask,
  updateTask,
  setIsUpdating,
  updateTaskSuccess,
} from '../tasks';
// https://github.com/reduxjs/redux-toolkit/blob/635d6d5e513e13dd59cd717f600d501b30ca2381/src/tests/createAction.test.ts

describe('Testing task reducer', () => {
  type SliceState = typeof initialState;
  let previousState: SliceState;
  beforeEach(() => {
    previousState = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle a todo being added so that loading is changed to true', () => {
    expect(reducer(previousState, addTask(MOCKED_TASK))).toEqual({
      ...previousState,
      loading: true,
    });
  });

  it('should handle a successfull todo request ', () => {
    const result = reducer(previousState, addTaskSuccess(MOCKED_TASK));
    expect(result).toEqual({
      ...previousState,
      tasks: [{ ...MOCKED_TASK, isUpdating: false }],
      loading: false,
    });
  });

  it('should handle a todo request failure', () => {
    const error = 'MOCKED ERROR';
    const result = reducer(previousState, addTaskError(error));
    expect(result).toEqual({
      ...previousState,
      error,
      loading: false,
    });
  });

  describe('fetching tasks from backend steps', () => {
    it('should handle get list request start', () => {
      const result = reducer(previousState, getTask());
      expect(result).toEqual({
        ...previousState,
        loading: true,
      });
    });

    it('should handle get list request success', () => {
      const result = reducer(previousState, getTaskSuccess(MOCKED_COMPLETED_TASKS));
      expect(result).toEqual({
        ...previousState,
        tasks: MOCKED_COMPLETED_TASKS,
        loading: false,
      });
    });

    it('should handle get list request failure', () => {
      const error = 'MOCKED ERROR';

      const result = reducer(previousState, getTaskError(error));
      expect(result).toEqual({
        ...previousState,
        error,
        loading: false,
      });
    });
  });

  describe('remove tasks from backend steps', () => {
    it('should handle get list request start', () => {
      previousState = { ...previousState, tasks: MOCKED_COMPLETED_TASKS };
      const result = reducer(previousState, removeTask(1));
      expect(result.tasks).toHaveLength(2);
      expect(result.tasks).toEqual([...MOCKED_COMPLETED_TASKS.slice(1)]);
    });
  });

  describe('updating tasks from backend steps', () => {
    it('should handle updating startup (show textfield)', () => {
      previousState = {
        ...previousState,
        tasks: MOCKED_COMPLETED_TASKS,
      };
      const result = reducer(previousState, setIsUpdating(1));
      expect(result.tasks).toHaveLength(3);
      expect(result).toEqual({
        ...previousState,
        tasks: [MOCKED_COMPLETED_TASK, ...MOCKED_COMPLETED_TASKS.slice(1)],
      });
    });

    it('should handle update task request start', () => {
      previousState = {
        ...previousState,
        tasks: MOCKED_INCOMPLETED_TASKS,
      };
      const result = reducer(previousState, updateTask(MOCKED_TASK));
      expect(result).toEqual({
        ...previousState,
        loading: true,
      });
    });

    it('should handle update task request success', () => {
      previousState = {
        ...previousState,
        tasks: MOCKED_INCOMPLETED_TASKS,
        loading: true,
      };
      const result = reducer(previousState, updateTaskSuccess(MOCKED_COMPLETED_DJANGO_TASK));
      expect(result).toEqual({
        ...previousState,
        tasks: [MOCKED_COMPLETED_TASK_NOT_UPDATING, ...MOCKED_INCOMPLETED_TASKS.slice(1)],
        loading: false,
      });
      expect(result.tasks).toHaveLength(3);
    });
  });
});
