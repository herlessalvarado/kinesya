import React, { FC, useEffect, useState } from 'react';
import ProfileCard from '../components/Card';
import EmployeeService from '../network/employeeService';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

interface Profile{
    name ?: string;
    description ?: string;
    price ?: Number; 
    profilePhoto ?: string;
}

const Main:FC<Profile> = (props : Profile) => {
    const [employees, setEmployees] = useState(new Array<Profile>());
    let employeeService = new EmployeeService();
    useEffect( ()=>{
        employeeService.getEmployees(setEmployees);
    },[employeeService]);
    return(
        <div>
        { employees ?
            employees.map((employee,index) => (
              <ProfileCard key={index} name={employee.name} image={process.env.REACT_APP_API_URL + employee.profilePhoto}  description={employee.description} price={employee.price} ></ProfileCard>
            )) : null}
        </div>
    )
}

export default Main