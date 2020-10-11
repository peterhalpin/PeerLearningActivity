import React from 'react';
import './style.css';
import RadioButtonPanel from '../RadioButtonPanel/RadioButtonPanel.js';
import Slider from '../Slider/Slider.js';
import QAPanel from '../QAPanel/QAPanel.js';
import DataDisplay from '../DataDisplay/DataDisplay.js';

class DataPanels extends React.Component {

    constructor(props) {
        super(props);
        //TODO: Get headings from data.js in the future
        this.headings = ['heading 1', 'heading 2', 'heading 3'];
        this.state={
            selectedDataType: this.headings[0],
            selectedDate: '14',
            selectedState: 'Alabama'
        }
        this.setData = this.setData.bind(this);
        
    }

    setData(type, value) {
      this.setState({[type]: [value]});
    }

    render() {
      console.log(this.state.selectedDate);
        return(
          <div className='dataPanels'>
            <RadioButtonPanel ref={(pageComponent) => {window.radioButtonComponent = pageComponent}} setData={this.setData}/>
            <Slider setData={this.setData}/>
            <DataDisplay selectedDate={this.state.selectedDate} selectedDataType={this.state.selectedDataType}/>
            <QAPanel/>
          </div>

        )
    }
}

export default DataPanels;