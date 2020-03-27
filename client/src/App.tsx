import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import EmployeeService from './network/employeeService';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ProfileCard from './components/Card';
import axios from 'axios';

//import Grid from '@material-ui/core/Grid';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

interface Profile{
  name: string;
  description: string;
  price: Number; 
  profilePhoto: string;
}



let sections: {title: string, url: string} [] = [
  {title : "Login" , url : "#"},
  {title : "Clients", url : "#"},
  {title : "About", url : "#"}
]


export default function App() {
 
  const [employees, setEmployees] = useState(new Array<Profile>());
  let employeeService = new EmployeeService();
  useEffect( ()=>{
   employeeService.getEmployees(setEmployees);
  },[employeeService]);
  return (
    <React.Fragment>
      <CssBaseline>
      <Container maxWidth="lg">
        <Header title="PK" sections={sections}></Header>
        <main>
          {
            employees.map((employee,index) => (
              <ProfileCard key={index} name={employee.name} image={process.env.REACT_APP_API_URL + employee.profilePhoto}  description={employee.description} price={employee.price}></ProfileCard>
            ))
          }
        </main>
    </Container>
    </CssBaseline>
    </React.Fragment>
  );
}

