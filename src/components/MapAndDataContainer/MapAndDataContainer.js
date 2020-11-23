import React from "react";
import { Container } from "semantic-ui-react";
import "./MapAndDataContainer.css";
import Map from "../Map/Map.js";
import DataPanels from "../DataPanels/DataPanels.js";
import {
  getDefaultHeading,
  getDefaultDateInt,
  mapIntToDate,
  organizedObject,
  getDateRange,
} from "../../utils/data.js";

class MapAndDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "Alabama",
      currentData: 0,
      selectedDate: getDefaultDateInt(),
      selectedDataType: getDefaultHeading(),
    };
    this.setData = this.setData.bind(this);
    this.changeSelectedState = this.changeSelectedState.bind(this);
    this.changeCurrentData = this.changeCurrentData.bind(this);
    this.changeSelectedDate = this.changeSelectedDate.bind(this);
    this.changeDataType = this.changeDataType.bind(this);

    this.selectStateWithData = this.selectStateWithData.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  setData(type, value, callback) {
    if (callback) {
      this.setState({ [type]: [value] }, callback);
    }
    this.setState({ [type]: [value] });
    if (!this.props.testEnv) {
      // sync togetherJS
      if (window.TogetherJS.running) {
        window.TogetherJS.send({
          type: "dataUpdate",
          dataType: type,
          dataValue: value,
        });
      }
    }
  }

  refreshData() {
    if (organizedObject) {
      let dataForState = organizedObject[this.state.selectedState];
      if (dataForState) {
        let destylizedType = this.state.selectedDataType
          .toString()
          .replace(" ", "_");
        let dataForType = dataForState[destylizedType];
        if (dataForType) {
          let dataForDate = dataForType[mapIntToDate(this.state.selectedDate)];
          this.changeCurrentData(dataForDate);
        }
      }
    }
  }

  changeSelectedState(name) {
    this.setData("selectedState", name, undefined);
  }

  changeCurrentData(data) {
    this.setData("currentData", data, undefined);
  }

  changeSelectedDate(date) {
    this.setData("selectedDate", date, this.refreshData);
  }

  changeDataType(type) {
    this.setData("selectedDataType", type, this.refreshData);
    const destylizedValue = type.replace(" ", "_");
    this.updateLayer(destylizedValue);
    if (!this.props.testEnv) {
      // sync togetherJS
      if (window.TogetherJS.running) {
        window.TogetherJS.send({
          type: "layerUpdate",
          value: destylizedValue
        });
      }
    }
  }

  selectStateWithData(stateName, data) {
    this.changeSelectedState(stateName);
    this.changeCurrentData(data);
  }

  updateLayer(value) {
    this.childMap.switchToLayer(value);
  }

  sendData() {
    const data = this.state;
    this.props.sendMapData(data);
  }

  componentDidMount() {
    this.refreshData();
    if (!this.props.testEnv) {
      // register together Sync
      window.TogetherJS.hub.on("dataUpdate", (msg) => {
        if (!msg.sameUrl) return;
        const type = msg.dataType;
        const value = msg.dataValue;
        this.setState({ [type]: [value] });
      });
      window.TogetherJS.hub.on("layerUpdate", (msg) => {
        if (!msg.sameUrl) return;
        this.updateLayer(msg.value);
      });
    }
  }
  render() {
    return (
      <Container data-testid="MapAndDataContainer">
        <DataPanels
          updateLayer={this.updateLayer}
          changeDataType={this.changeDataType}
          changeSelectedDate={this.changeSelectedDate}
          sendData={this.sendData}
          selectedDate={this.state.selectedDate}
          currentData={this.state.currentData}
          selectedDataType={this.state.selectedDataType}
          selectedState={this.state.selectedState}
          dateRange={getDateRange()}
        />
        <Map
          ref={(ref) => (this.childMap = ref)}
          selectedDate={this.state.selectedDate}
          selectedDataType={this.state.selectedDataType}
          onClickMap={this.selectStateWithData}
        />
      </Container>
    );
  }
}

export default MapAndDataContainer;
