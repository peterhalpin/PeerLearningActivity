import React from 'react';
import { Container } from 'semantic-ui-react';
import './MapAndDataContainer.css';
import Map from '../Map/Map.js';
import DataPanels from '../dataPanels/dataPanels.js';

class MapAndDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Container>
        <DataPanels/>
        <Map/>
      </Container>
    )  
  }
}




export default MapAndDataContainer;
