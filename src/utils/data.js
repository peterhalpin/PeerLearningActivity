import * as d3 from 'd3';
import { statesData, dataCollect } from '../components/Map/us-states.js';
let headings = [];
let dataObject;

export const renderData = async function(){
    await d3.csv("/data/COVID_Data_2020_07_04.csv").then(function(data) {
        dataObject = data;
        headings = Object.keys(data[0]).filter(currHeading => {
            return currHeading !== 'id' && currHeading !== 'location' && currHeading !== 'date';
        });
    });
    return true;
}

export const getHeadings = function(){
    return headings;
}

export const getStyledHeadings = function(){
    let styledHeadings = headings.map(curr => {
        return curr.replace('_',' ');
    })
    return styledHeadings;
}

export const getDefaultHeading = function(){
    return headings[0];
}

export const getData = function(){
    return dataObject;
}

export const getDataJSON = function(){
    return JSON.stringify(dataObject);
}

export const getDateObject = function(){
    let dateObject = dataObject.map(curr => {
        const dateString = curr.date;
        const dateSplit = dateString.split('-');
        const date = new Date( dateSplit[0],dateSplit[1],dateSplit[2])
        return {id: curr.id, date: date};
    });
    return dateObject;

}

export const getMinDate = function(){
    return getDateObject().reduce(function(prev, curr) {
        return prev.date < curr.date ? prev : curr;
    });
}

export const getMaxDate = function(){
    return getDateObject().reduce(function(prev, curr) {
        return prev.date > curr.date ? prev : curr;
    });
}

export const getDateRange = function(){
    let min = getMinDate();
    let max = getMaxDate();
    
    const diffTime = Math.abs(max.date.getTime() - min.date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}

export const mapIntToDate = function(int){
    let min = {...getMinDate()};
    let selectedDate = new Date(min.date.getYear(), min.date.getMonth(), min.date.getDate());
    
    selectedDate.setDate(selectedDate.getDate() + int-1);
    const currentMonth = selectedDate.getMonth() + 1;
    //TODO: get year to work; currently displays a negative year
    return currentMonth + '/' + selectedDate.getDate();
}

export const getDefaultDateInt = function(){
    return Math.floor(getDateRange()/2);
}

export const loadDataIntoGeoJSON = function() {
    const json = getData();
    var intermObj = {};
    for(const entry of json) {
      const stateName = entry.location;
      const dateString = entry.date;
      const dateSplit = dateString.split('-');
      const dateObj = new Date( dateSplit[0],dateSplit[1],dateSplit[2])
      const currentMonth = dateObj.getMonth() + 1;
      const currentDate = dateObj.getDate() + 1;
      const date = currentMonth + '/' + currentDate;
      const deaths = parseFloat(entry.deaths);
      const totalDeaths = parseFloat(entry.total_deaths);
      const tests = parseFloat(entry.tests);
      const totalTests = parseFloat(entry.total_tests);
      const infections = parseFloat(entry.infections);
      const totalInfections = parseFloat(entry.total_infections);
      if (!intermObj[stateName]) {
        intermObj[stateName] = {
          deaths: [],
          totalDeaths: [],
          tests: [],
          totalTests: [],
          infections: [],
          totalInfections: [],
        };
      }
      // intermObj[stateName][date] = {
      //   deaths: deaths,
      //   totalDeaths: totalDeaths,
      //   tests: tests,
      //   totalTests: totalTests,
      //   infections: infections,
      //   totalInfections: totalInfections,
      // } 
      intermObj[stateName]['deaths'].push({
        date: date, cases: deaths
      })
      intermObj[stateName]['totalDeaths'].push({
        date: date, cases: totalDeaths
      })
      intermObj[stateName]['tests'].push({
        date: date, cases: tests
      })
      intermObj[stateName]['totalTests'].push({
        date: date, cases: totalTests
      })
      intermObj[stateName]['infections'].push({
        date: date, cases: infections
      })
      intermObj[stateName]['totalInfections'].push({
        date: date, cases: totalInfections
      })
    }
    // console.log(intermObj);
  
  // const statesDataDeath = JSON.parse(JSON.stringify(statesData));
  console.log(intermObj['Alabama']);
  for (const dataType of Object.keys(intermObj['Alabama'])) {
    const statesDataForType = { type:"FeatureCollection",features:[] };
    for (var feature of statesData.features) {
      const stateName = feature.properties.name;
      console.log(stateName);
      const state = intermObj[stateName]; 
      // console.log(state);
      if (state) {
        const data = state[dataType];
        // console.log(deaths);
        for (const pair of data) {
          const featureNew = JSON.parse(JSON.stringify(feature));
          featureNew.properties.date = pair.date;
          featureNew.properties.cases = pair.cases;
          statesDataForType.features.push({...featureNew});
        }

      }
      // console.log(statesDataDeath);
      dataCollect[dataType] = {...statesDataForType};
      
      // feature.properties.data = {...intermObj[stateName]}; 
      // feature.properties.data = []; 
      // feature.properties.data.push(intermObj[stateName]);

    }

  }
  console.log(dataCollect);
  
}
