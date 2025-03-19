import { User } from '@renderer/types/UserType';
import axios from 'axios';

export class UserApi {
  static async getAll(): Promise<User[]> {
    try {
      const { data } = await axios.get<User[]>('http://localhost:5000/clients');
      return data;
    } catch (e) {
      console.log('$', e);
      return [];
    }
  }
}
