import React from 'react';
import './style.css';
import RadioButtonPanel from '../RadioButtonPanel/RadioButtonPanel.js';
import Slider from '../Slider/Slider.js';
import DataDisplay from '../DataDisplay/DataDisplay.js';
import {getDefaultHeading, getDefaultDateInt} from '../../utils/data.js';

class DataPanels extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            selectedDataType: getDefaultHeading(),
            selectedDate: getDefaultDateInt(),
            currentData: 0,
            selectedState: 'Alabama'
        }
        this.setData = this.setData.bind(this);
        this.setSelectState = this.setSelectState.bind(this);
    }

    setData(type, value) {
      this.setState({[type]: [value]});
    }

    setSelectState(name) {
      this.setData('selectedState', name);
      console.log(this.state.selectedState);
    }

    setCurrentData(data) {
      this.setData('currentData', data);
      console.log(this.state.currentData);
    }

    render() {
        return(
          <div className='dataPanels'>
            <Slider setData={this.setData}/>
            <RadioButtonPanel setData={this.setData}/>
            <DataDisplay selectedDate={this.state.selectedDate} currentData={this.state.currentData} selectedDataType={this.state.selectedDataType} selectedState={this.state.selectedState}/>
          </div>

        )
    }
}

export default DataPanels;
