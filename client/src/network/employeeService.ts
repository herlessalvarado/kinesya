import axios,{AxiosResponse} from 'axios';

export default class EmployeeService<T> {
    getEmployees(): Promise<Array<T>>{
       return axios.get('/employees').then((res:AxiosResponse<Array<T>>)=>{
         return res.data;
       });
    }
    getEmployeeByToken(token: string): Promise<T>{
      return axios.get('/users/me', {headers: {'Authorization': `Bearer ${token}`} }).then((res:AxiosResponse<T>)=>{
        return res.data;
      })
    }
}