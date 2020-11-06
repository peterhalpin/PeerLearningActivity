import React from 'react';
import { List, Form, Button } from '../../../node_modules/semantic-ui-react';
import { mapIntToDate } from '../../utils/data.js'
import './logTable.css';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      items: [],
      currItem: undefined
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
      currItem: undefined
    })
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'logTableUpdate',
        log: currList
      });
    }
  }

  receiveMapData(data) {
    this.setState({
      currItem: data
    }, this.handleSubmit);
  }

  componentDidMount() {
    if (this.props.testEnv) return;
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
              <Form.Input placeholder='put your data log here' onChange={this.handleFormChange} value={typeof this.state.currItem === 'string' ? this.state.currItem : '' }/>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>

          <List divided verticalAlign='middle'>
            {this.state.items.map((item) => {
              if(item) {
                if(typeof item === 'string') {
                  return <List.Item>{item}</List.Item>
                } else {
                  return <List.Item><List.Header>{item.selectedState}</List.Header>{item.selectedDataType} on {mapIntToDate(item.selectedDate)}: {item.currentData}</List.Item>
                }
              }
              return null;
            })}
          </List>
        </div>
      </div>
    )
  }
}

  export default LogTable;
