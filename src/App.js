import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import HelpButton from './components/help/HelpButton.js';
import LogTable from './components/logTable/logTable.js';
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
  }

  handleClick() {
    this.setState({hasBegun: true})
  }

  sendMapData(data) {
    this.childLogTable.receiveMapData(data)
  }
  render(){
    if(this.state.hasBegun){
      return (
        <React.Fragment>
          <HelpButton />
          <Container>
            <Header />
            <LogTable ref={ref => this.childLogTable = ref}/>
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
