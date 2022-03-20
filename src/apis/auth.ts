import axios from 'axios';

import endPoints from '.';

import type { User } from '@store/types/models';

class AuthAPI {
  static async login({ email, password }: { email: string; password: string }): Promise<string> {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post<{ access_token: string }>(
      endPoints.auth.login,
      { email, password },
      options
    );
    return data.access_token;
  }

  static async getUser(token: string): Promise<User> {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get<{ email: string; name: string }>(endPoints.auth.profile);

    return data;
  }

  // static async deleteTask(id: number): Promise<void> {
  //   await axiosInstance.delete(`/task/${id}`);
  // }

  // static async updateTask(
  //   id: number,
  //   data: { text: string; completed: boolean }
  // ): Promise<DjangoTask> {
  //   const response = await axiosInstance.put<DjangoTask>(`/task/${id}/`, data);
  //   return response.data;
  // }

  // static async createTask(data: DjangoTask): Promise<DjangoTask> {
  //   const response = await axiosInstance.post<DjangoTask>('/', data);
  //   return response.data;
  // }
}

export default AuthAPI;
