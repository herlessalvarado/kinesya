import axios,{AxiosResponse} from 'axios';

export default class UserService<T> {
    async getUsers(): Promise<Array<T>>{
       const res = await axios.get('/users');
      return res.data;
    }
    async getUserByToken(): Promise<T>{
      const res = await axios.get('/users/me');
      return res.data;
    }
    async logInUser(email: string, password: string): Promise<T>{
      const res = await axios.post('/users/login', { email, password });
      return res.data;
    }
    async signUp(email:string, password: string): Promise<string>{
      const res = await axios.post('/users', { email, password });
      return res.data.message;
    }
    async updateUser(formData: any): Promise<string>{
      const res = await axios.put('/users', formData);
      return res.data.message;
    }
    async logOutUser(): Promise<string>{
      const res = await axios.post('/users/me/logout');
      return res.data.message;
    }
}