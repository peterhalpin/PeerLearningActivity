import React from 'react';
import { Container } from 'semantic-ui-react';
import './MapAndDataContainer.css';
import Map from '../Map/Map.js';
import DataPanels from '../dataPanels/dataPanels.js';
import {getDefaultHeading, mapIntToDate, organizedObject} from '../../utils/data.js';

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
    this.changeSelectedState = this.changeSelectedState.bind(this);
    this.changeCurrentData = this.changeCurrentData.bind(this);
    this.changeSelectedDate = this.changeSelectedDate.bind(this);
    this.changeDataType = this.changeDataType.bind(this);

    this.selectStateWithData = this.selectStateWithData.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  setData(type, value) {
    this.setState({[type]: [value]});
  }

  refreshData() {
    if(organizedObject) {
      console.log(this.state.selectedState);
      let dataForState = organizedObject[this.state.selectedState];
      if(dataForState) {
      console.log(dataForState);
      console.log(this.state.selectedDataType);
          const destylizedType = this.state.selectedDataType.toString().replace(' ', '_');
        let dataForType = dataForState[destylizedType];
        if(dataForType) {
      console.log(dataForType);
      console.log(this.state.selectedDate);
          let dataForDate = dataForType[mapIntToDate(this.state.selectedDate)];
          this.setState({currentData: [dataForDate]});
          console.log(this.state.currentData);
        }
      }
    }

  }

  changeSelectedState(name) {
    this.setData('selectedState', name);
  }

  changeCurrentData(data) {
    this.setData('currentData', data);
  }

  changeSelectedDate(date) {
    this.setData('selectedDate', date);
    this.refreshData();
  }

  changeDataType(type) {
    this.setData('selectedDataType', type);
    this.refreshData();
    const destylizedValue = type.replace(' ', '_');
    this.updateLayer(destylizedValue);
  }

  selectStateWithData(stateName, data) {
    this.changeSelectedState(stateName);
    this.changeCurrentData(data);
  }

  updateLayer(value) {
    // this.setState({selectedDataType: [value]});
    this.childMap.switchToLayer(value);
  }

  render() {
    return(
      <Container>
        <DataPanels 
          updateLayer={this.updateLayer}
          // setData={this.setData}
          changeDataType={this.changeDataType}
          changeSelectedDate={this.changeSelectedDate}
          selectedDate={this.state.selectedDate} 
          currentData={this.state.currentData} 
          selectedDataType={this.state.selectedDataType} 
          selectedState={this.state.selectedState}
        />
        <Map 
          ref={ref => (this.childMap = ref)}  
          selectedDate={this.state.selectedDate} 
          selectedDataType={this.state.selectedDataType} 
          onClickMap={this.selectStateWithData}
        />
      </Container>
    )  
  }
}




export default MapAndDataContainer;
