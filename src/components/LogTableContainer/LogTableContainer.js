import React from 'react';
import { Grid, Segment, Button} from 'semantic-ui-react';
import LogTable from '../logTable/logTable.js'
import './LogTableContainer.css';


class LogTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
			activeIndex: 0,
			length: 3,
			infos: []
    }
		this.goToPrevTable = this.goToPrevTable.bind(this);
		this.goToNextTable = this.goToNextTable.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

		const currList = info.items.concat(info.currItem);
		infoList[this.state.activeIndex].items = currList;
		this.setState({
			infos: infoList
		});
    // // together JS running update
    // if (!this.props.testEnv && window.TogetherJS.running) {
    //   window.TogetherJS.send({
    //     type: 'logTableUpdate',
    //     log: currList
    //   });
    // }
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
		for(let i = 0; i < 3; i++) {
			infoList.push({
				items: [],
				currItem: undefined
			})
		}
		this.setState({
			infos: infoList
		});
    // if (this.props.testEnv) return;
    // window.TogetherJS.hub.on('logTableUpdate', msg => {
    //   if (!msg.sameUrl) return;
    //   this.setState({ items: msg.log });
    // });
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
						currItem={this.state.infos[this.state.activeIndex].currItem}
						items={this.state.infos[this.state.activeIndex].items}
						
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
