import React from "react";
import "./TogetherButton.css";

// Note: this component is not currently being used anywhere since TogheterJS autostarts.
// However, you can use this button to toggle TogetherJS if autostart is false
class TogetherButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      togetherON: false,
    };
  }

  ToggleButton() {
    this.setState({
      togetherON: !this.state.togetherON,
    });
    window.TogetherJS(this);
    return false;
  }

  render() {
    return (
      <div>
        <button
          className="ui button TogetherButton"
          onClick={() => this.ToggleButton()}
        >
          <i className="handshake icon"></i>
        </button>
      </div>
    );
  }
}

TogetherButton.propTypes = {};

TogetherButton.defaultProps = {};

export default TogetherButton;
