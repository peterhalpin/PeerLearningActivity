import React from "react";
import { List, Form, Button } from "semantic-ui-react";
import { mapIntToDate } from "../../utils/data.js";
import "./LogTable.css";

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currItem: undefined,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      currItem: e.target.value,
    });
    this.props.handleFormChange(e);
  }

  handleSubmit() {
    this.props.handleSubmit();
    this.setState({
      currItem: undefined,
    });
  }

  render() {
    return (
      <div className="LogTable" data-testid="logTable">
        <p>Student log {this.props.activeIndex}</p>
        <Form>
          <Form.Input
            placeholder="put your data log here"
            onChange={this.handleFormChange}
            value={
              typeof this.state.currItem === "string" ? this.props.currItem : ""
            }
          />
          <Button
            onClick={() => {
              this.handleSubmit();
              this.props.endTurn();
            }}
          >
            Submit
          </Button>
          <Button onClick={this.props.undo}>Undo</Button>
        </Form>

        <List divided verticalAlign="middle">
          {this.props.items.map((item) => {
            if (item) {
              if (typeof item === "string") {
                return <List.Item>{item}</List.Item>;
              } else {
                return (
                  <List.Item>
                    <List.Header>{item.selectedState}</List.Header>
                    {item.selectedDataType} on {mapIntToDate(item.selectedDate)}
                    : {item.currentData}
                  </List.Item>
                );
              }
            }
            return null;
          })}
        </List>
      </div>
    );
  }
}

export default LogTable;
