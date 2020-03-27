import React from 'react';
import {EmployeeService} from './network/employeeService'

export interface  State{
  email?: string;
  name?: string; 
}
export default class App extends React.Component{
  state:State ={
    name: ""
  };
}

