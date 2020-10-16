import React from 'react';
import { Container } from 'semantic-ui-react';
import './MapAndDataContainer.css';
import Map from '../Map/Map.js';
import DataPanels from '../dataPanels/dataPanels.js';

class MapAndDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Alabama',
      selectedStateData: 20 
    };
    this.selectStateWithData = this.selectStateWithData.bind(this);
  }


  selectStateWithData(stateName, data) {
    this.setState({
      selectedState: [stateName],
      selectedStateData: [data]
    });
    this.childPanel.setSelectState(stateName);
  }

  render() {
    return(
      <Container>
        <DataPanels ref={ref => this.childPanel = ref}/>
        <Map onClickMap={this.selectStateWithData}/>
      </Container>
    )  
  }
}




export default MapAndDataContainer;
