import * as d3 from 'd3';
import { statesData, dataCollect } from '../components/Map/us-states.js';
let headings = [];
let dataObject;
export var organizedObject = {};

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
        const date = new Date(parseInt(dateSplit[0]),parseInt(dateSplit[1]) - 1,parseInt(dateSplit[2]));
        return {id: curr.id, date: date};
    });
    return dateObject;
}

export const getMinDate = function(){
    //TODO: store this in the object
    return getDateObject().reduce(function(prev, curr) {
        return prev.date < curr.date ? prev : curr;
    });
}

export const getMaxDate = function(){
    //TODO: store this in the object
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
    let days = int - 1;
    let min = {...getMinDate()}.date;
    let newDate = new Date(min.getFullYear(),min.getMonth(), min.getDate() + days);
    const month = newDate.getMonth() + 1;
    return month + '/' + newDate.getDate() + '/' + newDate.getFullYear();
}

export const getDefaultDateInt = function(){
    return Math.floor(getDateRange()/2);
}

export const loadDataIntoGeoJSON = function() {
    const json = getData();
    for(const entry of json) {
      const stateName = entry.location;
      const dateString = entry.date;
      const dateSplit = dateString.split('-');
      const dateObj = new Date( dateSplit[0],dateSplit[1],dateSplit[2])
      const currentMonth = dateObj.getMonth() + 1;
      const currentDate = dateObj.getDate() + 1;
      const currentYear = dateObj.getFullYear();
      const date = currentMonth + '/' + currentDate + '/' + currentYear;
      const deaths = parseFloat(entry.deaths);
      const totalDeaths = parseFloat(entry.total_deaths);
      const tests = parseFloat(entry.tests);
      const totalTests = parseFloat(entry.total_tests);
      const infections = parseFloat(entry.infections);
      const totalInfections = parseFloat(entry.total_infections);
      if (!organizedObject[stateName]) {
        organizedObject[stateName] = {
          deaths: {},
          total_deaths: {},
          tests: {},
          total_tests: {},
          infections: {},
          total_infections: {}
        };
      }
      organizedObject[stateName]['deaths'][date] = deaths;
      organizedObject[stateName]['total_deaths'][date] = totalDeaths;
      organizedObject[stateName]['tests'][date] = tests;
      organizedObject[stateName]['total_tests'][date] = totalTests;
      organizedObject[stateName]['infections'][date] = infections;
      organizedObject[stateName]['total_infections'][date] = totalInfections;
    }
  
  for (const dataType of Object.keys(organizedObject['Alabama'])) {
    const statesDataForType = { type:"FeatureCollection",features:[] };
    for (var feature of statesData.features) {
      const stateName = feature.properties.name;
      console.log(stateName);
      const state = organizedObject[stateName]; 
      // console.log(state);
      if (state) {
        const data = state[dataType];
        // console.log(deaths);
        for (const date of Object.keys(data)) {
          const featureNew = JSON.parse(JSON.stringify(feature));
          featureNew.properties.date = date;
          featureNew.properties.cases = data[date];
          statesDataForType.features.push({...featureNew});
        }

      }
      // console.log(statesDataDeath);
      dataCollect[dataType] = {...statesDataForType};
      

    }

  }
  console.log(dataCollect);
  
}
