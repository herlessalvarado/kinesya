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
    const path = "http://localhost:8000/"

    useEffect( () =>{
        employeeService.getEmployees().then((res: Profile[]) => {
         setEmployees(res);
        })
    },[]);
    return(
        <Grid container spacing={3}>  
        { employees ?
            employees.map((employee,index) => (
            <Grid key={index} item xs={6} sm={3}>
              <ProfileCard name={employee.name} description={employee.description} image={path+employee.profilePhoto} price={employee.price} ></ProfileCard>
            </Grid>
            )) : null}
        </Grid>
    )
}
//image={WhoreImg}

export default Main