import React, { FC, useEffect, useState } from 'react';
import ProfileCard from '../components/Card';
import EmployeeService from '../network/employeeService';
import WhoreImg from '../assets/62.jpg';
import Grid from '@material-ui/core/Grid';


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
    });
    return(
        <Grid container spacing={3}>  
        { employees ?
            employees.map((employee,index) => (
            <Grid item xs={6} sm={3}>
              <ProfileCard key={index} name={employee.name} image={WhoreImg}  description={employee.description} price={employee.price} ></ProfileCard>
            </Grid>
            )) : null}
        </Grid>
    )
}

export default Main