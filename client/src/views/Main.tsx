import React, { FC, useEffect, useState } from 'react';
import ProfileCard from '../components/Card';
import EmployeeService from '../network/employeeService';



interface Profile{
    name : string;
    description : string;
    price : Number; 
    profilePhoto : string;
}

const Main:FC = () => {
    const [employees, setEmployees] = useState(new Array<Profile>());
    let employeeService = new EmployeeService<Profile>();

    useEffect( () =>{
        employeeService.getEmployees().then((res: Profile[]) => {
         setEmployees(res);
        })
    },[]);
    return(
        <div>
        {
            employees?.map((employee,index) => (
              <ProfileCard key={index} name={employee.name} image={process.env.REACT_APP_API_URL + employee.profilePhoto}  description={employee.description} price={employee.price} ></ProfileCard>
            )) }
        </div>
    )
}

export default Main