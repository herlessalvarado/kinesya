import React, { useEffect, useState } from 'react';
import Header from '../views/Header';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Main from '../views/Main';
import { checkAuth } from '../cache/CookieManager';

let sections: {title: string, url: string} [] = [
  {title : "Clients", url : "/clients"},
  {title : "About", url : "/about"},
  {title : "Login" , url : "/login"}
]

let sections2: {title: string, url: string} [] = [
  {title : "Clients", url : "/clients"},
  {title : "About", url : "/about"},
  {title : "Logout" , url : "/login"}
]

export default function Home() {
  const [auth, setAuth] = useState(false);


  useEffect (() => {
    if(!!checkAuth()){
      setAuth(true);
    }
  }, [])
  return (
    <React.Fragment>
      <CssBaseline>
      <Container maxWidth="lg">
        {console.log(auth)}
        {auth ? <Header title="PK" sections={sections2}></Header> : <Header title="PK" sections={sections}></Header> }
        <main>
          <Main></Main>
        </main>
    </Container>
    </CssBaseline>
    </React.Fragment>
  );
}