import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './component/map/Map.js';
import HelpButton from './component/help/HelpButton.js';

function App() {
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
      </Container>
    </React.Fragment>
  );
}

export default App;
