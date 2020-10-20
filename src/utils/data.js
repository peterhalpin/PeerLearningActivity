import * as d3 from 'd3';
import { statesData } from '../components/Map/us-states.js';
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
    console.log(json);
    var intermObj = {};
    for(const entry of json) {
      console.log(entry);
      const stateName = entry.location;
      const date = entry.date;
      const deaths = entry.deaths;
      const totalDeaths = entry.total_deaths;
      const tests = entry.tests;
      const totalTests = entry.total_tests;
      const infections = entry.infections;
      const totalInfections = entry.total_infections;
      console.log(stateName);
      if (!intermObj[stateName]) {
        intermObj[stateName] = {};
      }
      intermObj[stateName][date] = {
        deaths: deaths,
        totalDeaths: totalDeaths,
        tests: tests,
        totalTests: totalTests,
        infections: infections,
        totalInfections: totalInfections,
      } 
    }
    for (var feature of statesData.features) {
      const stateName = feature.properties.name;
      feature.properties.data = intermObj[stateName];
    }
}
