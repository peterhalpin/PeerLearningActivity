import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './component/map/Map.js';
import RadioButtonPanel from './component/dataPanel/RadioButtonPanel'
import { getHeadings } from './utils/data';


function App() {
  
let headings = [];
headings = getHeadings(); 
// setTimeout(function(headings){

  return (
    <Container>
      {/* <RadioButtonPanel headings={headings}/> */}

      <Map/>
    </Container>
  );
// }, 1000);
}

export default App;
