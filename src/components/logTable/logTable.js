import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Form, Message, Button } from '../../../node_modules/semantic-ui-react';
import './logTable.css';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      items: [],
      currItem: ""
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(e) {
    console.log(e.target.value);
    console.log(this.state.items);
    this.setState({
      currItem: e.target.value 
    });
    
  }

  handleSubmit(e) {
    const currList = this.state.items.concat(this.state.currItem);
    this.setState({
      items: currList
    })
  }

  render() {
    return(
      <div className="LogTable ui raised segment compact" data-testid="logTable">
        <p>Student log</p>
          <Form >
            <Form.Input placeholder='put your data log here' onChange={this.handleFormChange}/>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>

        <List>
          {this.state.items.map((item) => (
            <List.Item>{item}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}

  export default LogTable;
