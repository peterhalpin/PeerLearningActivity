import React from 'react';
import { Grid, Segment, Button} from 'semantic-ui-react';
import LogTable from '../logTable/logTable.js'
import './LogTableContainer.css';

const numOfLogs = 3;

class LogTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
			activeIndex: 0,
			length: numOfLogs,
			infos: []
    }
		this.goToPrevTable = this.goToPrevTable.bind(this);
		this.goToNextTable = this.goToNextTable.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.undo = this.undo.bind(this);
		this.receiveMapData = this.receiveMapData.bind(this);
  }

  handleFormChange(e) {
		var infoList = this.state.infos;
		infoList[this.state.activeIndex].currItem = e.target.value;
		this.setState({
			infos: infoList
		});
  }

  handleSubmit() {
		var infoList = this.state.infos;
		var info = infoList[this.state.activeIndex];

		if (info.currItem) {
			const currList = info.items.concat(info.currItem);
			infoList[this.state.activeIndex].items = currList;
			infoList[this.state.activeIndex].currItem = undefined;
			this.setState({
				infos: infoList
			});
	    // together JS running update
	    if (!this.props.testEnv && window.TogetherJS.running) {
	      window.TogetherJS.send({
	        type: 'logTableUpdate',
	        log: currList
	      });
	    }
		}
  }

  undo() {
    // undo the previous log, do we need to switch user then?
		var infoList = this.state.infos;
		var info = infoList[this.state.activeIndex];
    var currList = info.items;
    currList.pop();
		infoList[this.state.activeIndex].items = currList;
		this.setState({
			infos: infoList
		});

    console.log(currList);

    if (!this.props.testEnv  && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'logTableUpdate',
        log: currList
      });
    }
  }

  receiveMapData(data) {
		var infoList = this.state.infos;
		infoList[this.state.activeIndex].currItem = data;
    this.setState({
      infos: infoList
    }, this.handleSubmit);
  }

  componentWillMount() {
		var infoList = [];
		for(let i = 0; i < numOfLogs; i++) {
			infoList.push({
				items: [],
				currItem: undefined
			})
		}
		this.setState({
			infos: infoList
		});
    if (this.props.testEnv) return;
		// register TogetherJS handlers
    window.TogetherJS.hub.on('logTableUpdate', msg => {
      if (!msg.sameUrl) return;
			var infoList = this.state.infos;
			infoList[this.state.activeIndex].items = msg.log;
      this.setState({ infos: infoList });
    });
    window.TogetherJS.hub.on('activeIndexUpdate', msg => {
      if (!msg.sameUrl) return;
      this.setState({ activeIndex: msg.index });
    });
  }

	goToPrevTable() {
		console.log('prev');
    let index = this.state.activeIndex;
    let length = this.state.length;
		if(index < 1) {
      index = length - 1;
    } else {
      index--;
    }
		console.log('index: ' + index);
		this.setState({
      activeIndex: index
    });
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'activeIndexUpdate',
        index: index
      });
    }
  }

	goToNextTable() {
		console.log('next');
    let index = this.state.activeIndex;
    let length = this.state.length;
	  if(index === length - 1) {
      index = 0
    } else {
      index++;
    }
		console.log('index: ' + index);
		this.setState({
      activeIndex: index
    });
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'activeIndexUpdate',
        index: index
      });
    }
  }

  render() {
		console.log("infos");
		console.log(this.state.infos);
    return(
			<div className='ui raised LogTableContainer'>
				<Segment>
					<LogTable 
						handleSubmit={this.handleSubmit}
						handleFormChange={this.handleFormChange}
						endTurn={this.props.endTurn}
						undo={this.undo}
						currItem={this.state.infos[this.state.activeIndex].currItem}
						items={this.state.infos[this.state.activeIndex].items}
						activeIndex={this.state.activeIndex}
					/>
					<Button.Group widths='2'>
						<Button onClick={() => this.goToPrevTable()}>
							<i className="caret left icon"></i> 
						</Button>
						<Button onClick={() => this.goToNextTable()}>
							<i className="caret right icon"></i> 
						</Button>
					</Button.Group>
				</Segment>
			</div>
    )
  }
}

export default LogTableContainer;
