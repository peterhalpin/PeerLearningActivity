import React from 'react';
import './style.css';
import { mapIntToDate } from '../../utils/data.js';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
  }

  handleChange(event) {
    this.props.changeSelectedDate(event.target.value);
  }

  getDate(){
    return this.props.selectedDate;
  }

  handleLeftArrowClick(){
    let value = parseInt(document.getElementById('dateSlider').value) - 1;
    this.handleChange({target:{value}});
  }

  handleRightArrowClick(){
    let value = parseInt(document.getElementById('dateSlider').value) + 1;
    this.handleChange({target:{value}});
  }

  render(){
    console.log(this.props.dateRange);
      return(
        <div className="ui raised segment compact sliderContainer" data-testid="Slider">
          <div className="sliderInput">
            <i class="caret left icon" onClick={this.handleLeftArrowClick}></i>
            <input data-testid="SliderInput" type="range" min="1" max={this.props.dateRange} value={this.props.selectedDate} className="slider" id="dateSlider" onChange={this.handleChange} />
            <i class="caret right icon" onClick={this.handleRightArrowClick}></i>
          </div>
          <p id='displayValue'>Date: {mapIntToDate(this.props.selectedDate)}</p>
        </div>
      )
  }
}
//TODO: change the display value to an input box
//min and max will be getDayMin and getDayMax from data.js in the future

export default Slider;
