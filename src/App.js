import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './component/map/Map.js';

function App() {
  return (
    <Container>
      <Map/>
    </Container>
  );
}

export default App;
