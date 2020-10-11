import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
import RadioButtonPanel from './components/RadioButtonPanel/RadioButtonPanel.js';

function App() {
  
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
        <RadioButtonPanel ref={(pageComponent) => {window.pageComponent = pageComponent}}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
