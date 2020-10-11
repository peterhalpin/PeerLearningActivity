import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
<<<<<<< HEAD
import RadioButtonPanel from './components/RadioButtonPanel/RadioButtonPanel.js';
import Slider from './components/Slider/Slider.js';
=======
import QAPanel from './components/QAPanel/QAPanel.js';
import DataDisplay from './components/DataDisplay/DataDisplay.js';
>>>>>>> c3d20a00b49d2c1edc9f86fa7751eb9e4077c9a3

function App() {
  
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
<<<<<<< HEAD
        <RadioButtonPanel ref={(pageComponent) => {window.radioButtonComponent = pageComponent}}/>
        <Slider />
=======
        <DataDisplay/>
        <QAPanel/>
>>>>>>> c3d20a00b49d2c1edc9f86fa7751eb9e4077c9a3
      </Container>
    </React.Fragment>
  );
}

setTimeout(function(){console.log(window.radioButtonComponent.getCheckedButton()) }, 3000);

export default App;
