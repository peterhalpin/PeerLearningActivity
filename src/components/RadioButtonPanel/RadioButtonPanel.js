import React from "react";
import "./RadioButton.css";
import { getDefaultHeading, getStyledHeadings } from "../../utils/data.js";

function RadioButton(headings, checkedButton, handleChange) {
  let nameCount = -1;
  const labels = headings.map((currHeading) => {
    nameCount++;
    return (
      <div className="field" key={nameCount}>
        <div className="ui radio checkbox">
          <input
            type="radio"
            name={"button"}
            value={currHeading}
            checked={Array.isArray(checkedButton) ? checkedButton[0] === currHeading : checkedButton === currHeading}
            onChange={handleChange}
          />
          <label>
            <p className="capitalize">{currHeading}</p>
          </label>
        </div>
      </div>
    );
  });
  return labels;
}

class RadioButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.headings = getStyledHeadings();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeDataType(event.target.value);
  }

  render() {
    return (
      <div
        ref={(childComponent) => {
          window.radioButtonComponent = childComponent;
        }}
        className="ui raised segment compact radioPanel"
        data-testid="RadioButton"
      >
        <div className="ui form">
          <div className="grouped fields">
            {RadioButton(
              this.headings,
              this.props.selectedDataType,
              this.handleChange
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButtonPanel;
