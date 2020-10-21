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
      currentData: 20,
      selectedDate: 0,
      selectedDataType: getDefaultHeading(),
    };
    this.setData = this.setData.bind(this);
    this.setSelectState = this.setSelectState.bind(this);
    this.setCurrentData = this.setCurrentData.bind(this);
    this.selectStateWithData = this.selectStateWithData.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  setData(type, value) {
    this.setState({[type]: [value]});
    if(type === 'selectedDataType') {
      this.updateLayer(value);
    }
  }

  setSelectState(name) {
    this.setData('selectedState', name);
    console.log(this.state.selectedState);
  }

  setCurrentData(data) {
    this.setData('currentData', data);
    console.log(this.state.currentData);
  }

  selectStateWithData(stateName, data) {
    this.setSelectState(stateName);
    this.setCurrentData(data);
  }

  updateLayer(value) {
    this.setState({selectedDataType: [value]});
    const destylizedValue = value.replace(' ', '_');
    this.childMap.switchToLayer(destylizedValue);
  }

  render() {
    return(
      <Container>
        <DataPanels 
          updateLayer={this.updateLayer}
          setData={this.setData}
          selectedDate={this.state.selectedDate} 
          currentData={this.state.currentData} 
          selectedDataType={this.state.selectedDataType} 
          selectedState={this.state.selectedState}
        />
        <Map 
          ref={ref => (this.childMap = ref)}  
          selectedDate={this.state.selectedDate} 
          onClickMap={this.selectStateWithData}
        />
      </Container>
    )  
  }
}




export default MapAndDataContainer;
