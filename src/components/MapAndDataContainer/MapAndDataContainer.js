import React from 'react';
import { Container } from 'semantic-ui-react';
import './MapAndDataContainer.css';
import Map from '../Map/Map.js';
import DataPanels from '../dataPanels/dataPanels.js';
import {getDefaultHeading} from '../../utils/data.js';

class MapAndDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLayer: getDefaultHeading(),
    };
    this.updateLayer = this.updateLayer.bind(this);
  }

  updateLayer(value) {
    this.setState({selectedLayer: [value]});
    const destylizedValue = value.replace(' ', '_');
    this.child.switchToLayer(destylizedValue);
  }

  render() {
    return(
      <Container>
        <DataPanels updateLayer={this.updateLayer}/>
        <Map onRef={ref => (this.child = ref)}/>
      </Container>
    )  
  }
}




export default MapAndDataContainer;
