import React from "react";
import { Segment, Button } from "semantic-ui-react";
import LogTable from "../LogTable/LogTable.js";
import "./LogTableContainer.css";

// Setting: change this to config the number of log tables
const numOfLogs = 3;

class LogTableContainer extends React.Component {
  constructor(props) {
    super(props);
    var infoList = [];
    for (let i = 0; i < numOfLogs; i++) {
      infoList.push({
        items: [],
        currItem: undefined,
      });
    }
    this.state = {
      activeIndex: 0,
      length: numOfLogs,
      infos: infoList,
    };
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
      infos: infoList,
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
        infos: infoList,
      });
      // together JS running update
      if (!this.props.testEnv && window.TogetherJS.running) {
        window.TogetherJS.send({
          type: "logTableUpdate",
          log: currList,
        });
      }
    }
  }

  undo() {
    // we can change whether to go back to the previous user if we UNDO here
    var infoList = this.state.infos;
    var info = infoList[this.state.activeIndex];
    var currList = info.items;
    currList.pop();
    infoList[this.state.activeIndex].items = currList;
    this.setState({
      infos: infoList,
    });

    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: "logTableUpdate",
        log: currList,
      });
    }
  }

  receiveMapData(data) {
    var infoList = this.state.infos;
    infoList[this.state.activeIndex].currItem = data;
    this.setState(
      {
        infos: infoList,
      },
      this.handleSubmit
    );
  }

  componentDidMount() {
    if (this.props.testEnv) return;
    // register TogetherJS handlers
    window.TogetherJS.hub.on("logTableUpdate", (msg) => {
      if (!msg.sameUrl) return;
      var infoList = this.state.infos;
      infoList[this.state.activeIndex].items = msg.log;
      this.setState({ infos: infoList });
    });
    window.TogetherJS.hub.on("activeIndexUpdate", (msg) => {
      if (!msg.sameUrl) return;
      this.setState({ activeIndex: msg.index });
    });
  }

  goToPrevTable() {
    let index = this.state.activeIndex;
    let length = this.state.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    this.setState({
      activeIndex: index,
    });
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: "activeIndexUpdate",
        index: index,
      });
    }
  }

  goToNextTable() {
    let index = this.state.activeIndex;
    let length = this.state.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    this.setState({
      activeIndex: index,
    });
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: "activeIndexUpdate",
        index: index,
      });
    }
  }

  render() {
    return (
      <div className="ui raised LogTableContainer">
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
          <Button.Group widths="2">
            <Button onClick={() => this.goToPrevTable()}>
              <i className="caret left icon"></i>
            </Button>
            <Button onClick={() => this.goToNextTable()}>
              <i className="caret right icon"></i>
            </Button>
          </Button.Group>
        </Segment>
      </div>
    );
  }
}

export default LogTableContainer;
