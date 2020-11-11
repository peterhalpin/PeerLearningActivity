import React from 'react';
import { Grid, Segment, Button} from 'semantic-ui-react';
import LogTable from '../logTable/logTable.js'
import LeftArrow from '../Arrows/LeftArrow.js'
import RightArrow from '../Arrows/RightArrow.js'
import './LogTableContainer.css';


class LogTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
			activeIndex: 0,
			length: 3
    }
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

	goToPrevTable() {
    let index = this.state.activeIndex;
    let length = this.state.length;
		if(index < 1) {
      index = length - 1;
    } else {
      index--;
    }
		this.setState({
      activeIndex: index
    });
  }

	goToNextTable() {
    let index = this.state.activeIndex;
    let length = this.state.length;
	  if(index === length - 1) {
      index = 0
    } else {
      index++;
    }
		this.setState({
      activeIndex: index
    });
  }

  render() {
    return(
			<div className='ui raised LogTableContainer'>
				<Segment>
						<LogTable ref={ref => this.child=ref} />
					<Button.Group widths='2'>
						<Button >
							<i className="caret left icon"></i> 
						</Button>
						<Button >
							<i className="caret right icon"></i> 
						</Button>
					</Button.Group>
				</Segment>
			</div>
    )
  }
}

export default LogTableContainer;
