import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
import RadioButtonPanel from './components/RadioButtonPanel/RadioButtonPanel.js';
import Slider from './components/Slider/Slider.js';
import QAPanel from './components/QAPanel/QAPanel.js';
import DataDisplay from './components/DataDisplay/DataDisplay.js';
import DataPanels from './components/dataPanels/dataPanels.js';

function App() {
  
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
        <DataPanels/>
        {/* <RadioButtonPanel ref={(pageComponent) => {window.radioButtonComponent = pageComponent}}/>
        <Slider />
        <DataDisplay/>
        <QAPanel/> */}
      </Container>
    </React.Fragment>
  );
}

// setTimeout(function(){console.log(window.radioButtonComponent.getCheckedButton()) }, 3000);

export default App;
