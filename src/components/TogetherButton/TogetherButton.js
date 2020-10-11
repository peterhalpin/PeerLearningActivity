import React from 'react';
import PropTypes from 'prop-types';
import styles from './TogetherButton.module.css';

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
    this.setState((currentState) => ({
      togetherON: !currentState.togetherON,
    }));
    this.state.text = 'Start Collaborating';
  } else {
    this.setState((currentState) => ({
      togetherON: !currentState.togetherON,
    }));
    this.state.text = 'Done Collaborating';
  }

  window.TogetherJS(this);
  return false;
}

render(){
    return(
        <div>
          <button className="TogetherJSButton" onClick={ () => this.ToggleButton() }>
            {this.state.text}
          </button>
        </div>
    )
  }
}

TogetherButton.propTypes = {};

TogetherButton.defaultProps = {};

export default TogetherButton;
