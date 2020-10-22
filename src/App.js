import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import HelpButton from './components/help/HelpButton.js';
import TogetherButton from './components/TogetherButton/TogetherButton.js';
import LogTable from './components/logTable/logTable.js';
import MapAndDataContainer from './components/MapAndDataContainer/MapAndDataContainer.js';
import Header from './components/Header/Header.js';

function App() {
  
  return (
    <React.Fragment>
      <HelpButton />
      <Header />
      <Container>
        <TogetherButton/>
        <LogTable/>
        <MapAndDataContainer/>
      </Container>
    </React.Fragment>
  );
}

export default App;
