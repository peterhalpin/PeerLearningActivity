import React from 'react';
import './style.css';
import {getDateRange, getDefaultDateInt, mapIntToDate} from '../../utils/data.js';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      dateValue: getDefaultDateInt()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({dateValue: event.target.value});
    this.props.setData('selectedDate', event.target.value);
  }

  getDate(){
    return this.state.dateValue;
  }

  componentDidMount(){
    this.props.setData('selectedDate', this.state.dateValue);
  }

  render(){
      return(
        <div className="ui raised segment compact sliderContainer">
          <input type="range" min="1" max={getDateRange()} value={this.state.dateValue} className="slider" id="dateSlider" onChange={this.handleChange} />
          <p id='displayValue'>Date: {mapIntToDate(this.state.dateValue)}</p>
        </div>
      )
  }
}
//TODO: change the display value to an input box
//min and max will be getDayMin and getDayMax from data.js in the future

export default Slider;