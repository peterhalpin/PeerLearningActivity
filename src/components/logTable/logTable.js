import React from 'react';
import { List, Form, Button } from '../../../node_modules/semantic-ui-react';
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
    this.setState({
      currItem: e.target.value 
    });
    
  }

  handleSubmit() {
    const currList = this.state.items.concat(this.state.currItem);
    this.setState({
      items: currList,
      currItem: ""
    })
    // together JS running update
    if (window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'logTableUpdate',
        log: currList
      });
    }
  }

  receiveMapData(data) {
    console.log(data);
  }

  componentDidMount() {
    window.TogetherJS.hub.on('logTableUpdate', msg => {
      if (!msg.sameUrl) return;
      this.setState({ items: msg.log });
    });
  }

  render() {
    return(
      <div className="LogTable" data-testid="logTable">
        <div className="ui segment raised">
          <p>Student log</p>
            <Form >
              <Form.Input placeholder='put your data log here' onChange={this.handleFormChange} value={this.state.currItem}/>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>

          <List>
            {this.state.items.map((item) => (
              <List.Item>{item}</List.Item>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

  export default LogTable;
