import React from 'react';
import './TogetherButton.css';

class TogetherButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      togetherON: false,
    }
  }

  ToggleButton(){
    this.setState({
      togetherON: !this.state.togetherON
    })
    window.TogetherJS(this);
    return false;
  }

  render(){
    return(
      <div>
        <button className="ui button TogetherButton" onClick={ () => this.ToggleButton() }>
          <i className="handshake icon"></i>
        </button>
      </div>
    )
  }
}

TogetherButton.propTypes = {};

TogetherButton.defaultProps = {};

export default TogetherButton;
