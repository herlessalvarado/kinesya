import React from 'react';
import Header from './components/Header';

let sections: {title: string, url: string} [] = [
  {title : "Login" , url : "#"},
  {title : "Clients", url : "#"},
  {title : "About", url : "#"}
]

function App() {
  return (
    <Header title="PK" sections={sections}></Header>
  );
}

export default App;