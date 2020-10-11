import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Map from './components/Map/Map.js';
import HelpButton from './components/help/HelpButton.js';
import QAPanel from './components/QAPanel/QAPanel.js';
import DataDisplay from './components/DataDisplay/DataDisplay.js';

function App() {
  return (
    <React.Fragment>
      <HelpButton />
      <Container>
        <Map/>
        <DataDisplay/>
        <QAPanel/>
      </Container>
    </React.Fragment>
  );
}

export default App;
