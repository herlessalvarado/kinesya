export interface Employee{
    name: string;
    email: string;
    description?: string;
    price?: number;
    longitude?: number;
    latitude?: number;
}

export class EmployeeService {
    getEmployees(): Promise<Employee[]>{
        return fetch('http://localhost:8000/employees').then(res => res.json());
    }
}