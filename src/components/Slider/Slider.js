import React from 'react';
import './style.css';
import {getDateRange, getDefaultDateInt, mapIntToDate} from '../../utils/data.js';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    // this.state= {
    //   dateValue: getDefaultDateInt()
    // }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // this.setState({dateValue: event.target.value});
    this.props.changeSelectedDate(event.target.value);
  }

  getDate(){
    return this.props.selectedDate;
  }

  // componentDidMount(){
  //   this.props.changeSelectedDate(this.state.dateValue);
  // }

  render(){
      return(
        <div className="ui raised segment compact sliderContainer" data-testid="Slider">
          <input data-testid="SliderInput" type="range" min="1" max={this.props.dateRange} value={this.props.selectedDate} className="slider" id="dateSlider" onChange={this.handleChange} />
          <p id='displayValue'>Date: {mapIntToDate(this.props.selectedDate)}</p>
        </div>
      )
  }
}
//TODO: change the display value to an input box
//min and max will be getDayMin and getDayMax from data.js in the future

export default Slider;
