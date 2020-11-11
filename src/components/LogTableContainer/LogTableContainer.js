import React from 'react';
// import { List, Form, Button } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
// import { mapIntToDate } from '../../utils/data.js'
import LogTable from '../logTable/logTable.js'

class LogTableContainer extends React.Component {
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
		this.child.handleFormChange(e);
  }

  handleSubmit() {
		this.child.handleSubmit();
  }

  receiveMapData(data) {
		this.child.receiveMapData(data);
  }

  componentDidMount() {
    // if (this.props.testEnv) return;
    // window.TogetherJS.hub.on('logTableUpdate', msg => {
    //   if (!msg.sameUrl) return;
    //   this.setState({ items: msg.log });
    // });
  }

  render() {
    return(
			<Container>
				<LogTable ref={ref => this.child=ref} />
			</Container>
    )
  }
}

export default LogTableContainer;
