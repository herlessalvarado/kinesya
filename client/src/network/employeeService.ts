import axios,{AxiosError,AxiosResponse} from 'axios';

export default class EmployeeService<T> {
    getEmployees(callback: (data:any) => void): void{
        axios.get('/employees').then((response: AxiosResponse<Array<T>>) => {
            callback(response.data);
          } ).catch((err: AxiosError)=>{
            console.log(err.response?.data);
          })
    }
}