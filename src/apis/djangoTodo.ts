import axiosInstance from '../axiosInstance';
import type { DjangoTask } from '../store/slices/tasks';

class DjangoTodo {
  static async getTasks(): Promise<DjangoTask[]> {
    const response = await axiosInstance.get<DjangoTask[]>('/');
    return response.data;
  }

  static async getTaskById(id: number): Promise<DjangoTask> {
    const response = await axiosInstance.get<DjangoTask>(`/task/${id}`);
    return response.data;
  }

  static async deleteTask(id: number): Promise<void> {
    await axiosInstance.delete(`/task/${id}`);
  }

  static async updateTask(
    id: number,
    data: { text: string; completed: boolean }
  ): Promise<DjangoTask> {
    const response = await axiosInstance.put<DjangoTask>(`/task/${id}/`, data);
    return response.data;
  }

  static async createTask(data: DjangoTask): Promise<DjangoTask> {
    const response = await axiosInstance.post<DjangoTask>('/', data);
    return response.data;
  }
}

export default DjangoTodo;
