import axios,{AxiosResponse} from 'axios';

export default class UserService<T> {
    getUsers(): Promise<Array<T>>{
       return axios.get('/users').then((res:AxiosResponse<Array<T>>)=>{
         return res.data;
       });
    }
    getUserByToken(): Promise<T>{
      return axios.get('/users/me').then((res:AxiosResponse<T>)=>{
        return res.data;
      })
    }
    logInUser(email: string, password: string): Promise<T>{
      return axios.post('/users/login', {email, password}).then((res: AxiosResponse<T>)=>{
        return res.data;
      })
    }
    signUp(email:string, password: string): Promise<string>{
      return axios.post('/users', {email,password}).then((res: AxiosResponse<any>) => {
        return res.data.message;
      })
    }
    updateUser(formData: any): Promise<string>{
      return axios.put('/users', formData).then((res: AxiosResponse<any>) => {
        return res.data.message;
      })
    }
    logOutUser(): Promise<string>{
      return axios.post('/users/me/logout').then((res: AxiosResponse<any>) => {
        return res.data.message;
      })
    }
}