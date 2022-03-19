import { MOCKED_INCOMPLETED_TASKS } from '../../../mock_data/tasks';
import type { RootState } from '../../index';
import type { Task } from '../../slices/tasks';
import { getTasks, getTasksLoading } from '../tasks';

const buildState = (tasks: Task[], loading: boolean, error: string | null): RootState => ({
  task: {
    tasks,
    loading,
    error,
  },
});

describe('Testing get Tasks selector', () => {
  it('Should get tasks', () => {
    const state = buildState(MOCKED_INCOMPLETED_TASKS, true, null);
    const result = getTasks(state);
    expect(result).toHaveLength(3);
    expect(result).toBeInstanceOf(Array);
    expect(result).toBe(MOCKED_INCOMPLETED_TASKS);
  });

  it('Should return an empty array', () => {
    const state = buildState([], false, null);
    const result = getTasks(state);
    expect(result).toHaveLength(0);
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([]);
  });
});

describe('Testing getTasksLoading selector', () => {
  it('Should get false', () => {
    const state = buildState(MOCKED_INCOMPLETED_TASKS, false, null);
    const result = getTasksLoading(state);
    expect(result).toBe(false);
  });

  it('Should return an empty array', () => {
    const state = buildState([], true, null);
    const result = getTasksLoading(state);
    expect(result).toBe(true);
  });
});
