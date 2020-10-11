import React from 'react';
import PropTypes from 'prop-types';
import './TogetherButton.css';

class TogetherButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      togetherON: false,
      text: 'Start Collaborating'
    }
}

ToggleButton(){
  if (this.state.togetherON) {
    this.state.togetherON = false;
    this.state.text = 'Start Collaborating';
  } else {
    this.state.togetherON = true;
    this.state.text = 'Done Collaborating';
  }

  window.TogetherJS(this);
  return false;
}

render(){
    return(
        <div>
          <button className="ui button TogetherButton" onClick={ () => this.ToggleButton() }>
            {this.state.text}
          </button>
        </div>
    )
  }
}

TogetherButton.propTypes = {};

TogetherButton.defaultProps = {};

export default TogetherButton;
