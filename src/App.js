import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
import TogetherButton from './components/TogetherButton/TogetherButton.js';
import { onClickMap } from './map-example.js'; // TODO: replace with export functions from custom components
import DataPanels from './components/dataPanels/dataPanels.js';
import TogetherButton from './components/TogetherButton/TogetherButton.js';
import { onClickMap } from './map-example.js'; // TODO: replace with export functions from custom components

function App() {
  
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <TogetherButton/>
        <DataPanels/>
        <Map onClickCallback={onClickMap}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
