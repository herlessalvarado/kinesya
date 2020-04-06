import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCard from '../components/Card';
import CompleteCard from '../components/CompleteCard';
import EmployeeService from '../network/employeeService';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

interface Profile{
    name : string;
    description : string;
    price : Number; 
    profilePhoto : string;
    referencePhotos : Array<string>;
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

const Main:FC = () => {
    const classes = useStyles();
    const [employees, setEmployees] = useState(new Array<Profile>());
    let employeeService = new EmployeeService<Profile>();
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const path = process.env.REACT_APP_API_URL!;

    useEffect( () =>{
        employeeService.getEmployees().then((res: Profile[]) => {
         setEmployees(res);
        })
    },[]);
    return(
        <React.Fragment>
        <Grid container spacing={3}>  
        { employees ?
            employees.map((employee,index) => (
            <React.Fragment>
            <Grid key={index} item xs={6} sm={3} onClick={handleOpen}>
              <ProfileCard name={employee.name} description={employee.description} image={path+employee.profilePhoto} price={employee.price} ></ProfileCard>
            </Grid>
            <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <CompleteCard name={employee.name} description={employee.description} profile={path+employee.profilePhoto} price={employee.price} references={employee.referencePhotos}></CompleteCard>
          </Modal>
          </React.Fragment>
            )) : null}
        </Grid>
        
        
      </React.Fragment>
    )
}
//image={WhoreImg}

export default Main