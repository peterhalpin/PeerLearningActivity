import React from 'react';
import './style.css';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      dateValue: '50'
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

  render(){
      return(
        <div ref={(childComponent) => {window.sliderComponent = childComponent}} className="ui raised segment compact sliderContainer">
          <input type="range" min="1" max="100" value={this.state.dateValue} className="slider" id="dateSlider" onChange={this.handleChange} />
          <p id='displayValue'>Date: {this.state.dateValue}</p>
        </div>
      )
  }
}
//TODO: change the display value to an input box
//min and max will be getDayMin and getDayMax from data.js in the future

export default Slider;