import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
import Slider from './components/Slider/Slider.js';

function App() {
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
        <Slider />
      </Container>
    </React.Fragment>
  );
}

export default App;
