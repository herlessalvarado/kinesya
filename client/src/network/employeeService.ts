import axios,{AxiosResponse} from 'axios';

export default class EmployeeService<T> {
    getEmployees(): Promise<Array<T>>{
       return axios.get('/employees').then((res:AxiosResponse<Array<T>>)=>{
         return res.data;
       });
    }
    getEmployeeByToken(): Promise<T>{
      return axios.get('/employees/me').then((res:AxiosResponse<T>)=>{
        return res.data;
      })
    }
    logInEmployee(email: string, password: string): Promise<T>{
      return axios.post('/employees/login', {email, password}).then((res: AxiosResponse<T>)=>{
        return res.data;
      })
    }
    signUp(email:string, password: string): Promise<string>{
      return axios.post('/employees', {email,password}).then((res: AxiosResponse<any>) => {
        return res.data.message;
      })
    }
    updateEmployee(formData: any): Promise<string>{
      return axios.put('/employees', formData).then((res: AxiosResponse<any>) => {
        return res.data.message;
      })
    }
}