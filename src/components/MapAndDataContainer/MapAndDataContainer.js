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
      selectedState: 'Alabama',
      selectedStateData: 20,
      selectedLayer: getDefaultHeading(),
    };
    this.selectStateWithData = this.selectStateWithData.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }


  selectStateWithData(stateName, data) {
    this.setState({
      selectedState: [stateName],
      selectedStateData: [data]
    });
    this.childPanel.setSelectState(stateName);
    this.childPanel.setCurrentData(data);
  }

  updateLayer(value) {
    this.setState({selectedLayer: [value]});
    const destylizedValue = value.replace(' ', '_');
    this.childMap.switchToLayer(destylizedValue);
  }

  render() {
    return(
      <Container>
        <DataPanels ref={ref => this.childPanel = ref} updateLayer={this.updateLayer}/>
        <Map ref={ref => (this.childMap = ref)} onClickMap={this.selectStateWithData}/>
      </Container>
    )  
  }
}




export default MapAndDataContainer;
