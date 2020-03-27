import React from 'react';
import Header from './components/Header';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ProfileCard from './components/Card';
import Whoreimg from './assets/62.jpg';
//import Grid from '@material-ui/core/Grid';

let sections: {title: string, url: string} [] = [
  {title : "Login" , url : "#"},
  {title : "Clients", url : "#"},
  {title : "About", url : "#"}
]

let profile: {name: string, image: string, description: string, price: Number} [] = [
  {name: "Putita", image: Whoreimg, description: "La mas zorra de todo puente nuevo", price: 250}
]

function App() {
  return (
    <React.Fragment>
      <CssBaseline>
      <Container maxWidth="lg">
        <Header title="PK" sections={sections}></Header>
        <main>
          <ProfileCard name="Putita" image={Whoreimg} description="La mas zorra de todo puente nuevo" price={250}></ProfileCard>
        </main>
    </Container>
    </CssBaseline>
    </React.Fragment>
  );
}

