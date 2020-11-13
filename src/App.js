import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import HelpButton from './components/help/HelpButton.js';
import LogTableContainer from './components/LogTableContainer/LogTableContainer.js';
import MapAndDataContainer from './components/MapAndDataContainer/MapAndDataContainer.js';
import Header from './components/Header/Header.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import QaPanel from './components/qaPanel/qaPanel.js';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hasBegun:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.sendMapData = this.sendMapData.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }

  handleClick() {
    this.setState({hasBegun: true})
  }

  sendMapData(data) {
    this.childLogTable.receiveMapData(data)
    this.endTurn();
  }

  endTurn() {
    console.log("in endTurn function at App.js");
    this.childHeader.endTurn()
  }

  render(){
    if(this.state.hasBegun){
      return (
        <React.Fragment>
          <HelpButton />
          <Container>
            <Header ref={ref => this.childHeader = ref} />
            <LogTableContainer ref={ref => this.childLogTable = ref} endTurn={this.endTurn}/>
            <QaPanel/>
            <MapAndDataContainer sendMapData={this.sendMapData} />
          </Container>
        </React.Fragment>
      );
    } else {
      return(
        <LandingPage onClick = {this.handleClick}/>
      );
    }
  }
}

export default App;
