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
        <RadioButtonPanel ref={(pageComponent) => {window.radioButtonComponent = pageComponent}}/>
      </Container>
    </React.Fragment>
  );
}

setTimeout(function(){console.log(window.radioButtonComponent.getCheckedButton()) }, 3000);

export default App;
