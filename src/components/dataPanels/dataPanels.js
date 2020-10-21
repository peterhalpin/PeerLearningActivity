import React from 'react';
import './style.css';
import RadioButtonPanel from '../RadioButtonPanel/RadioButtonPanel.js';
import Slider from '../Slider/Slider.js';
import DataDisplay from '../DataDisplay/DataDisplay.js';

class DataPanels extends React.Component {

    render() {
        return(
          <div className='dataPanels'>
            <Slider setData={this.props.setData}/>
            <RadioButtonPanel setData={this.props.setData}/>
            <DataDisplay 
              selectedDate={this.props.selectedDate} 
              currentData={this.props.currentData} 
              selectedDataType={this.props.selectedDataType} 
              selectedState={this.props.selectedState}
            />
          </div>

        )
    }
}

export default DataPanels;
