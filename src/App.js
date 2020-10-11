import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';

function App() {
  return (
    <React.Fragment>
      <TogetherButton/>
      <HelpButton />
      <Container>
        <Map/>
      </Container>
    </React.Fragment>
  );
}

export default App;
