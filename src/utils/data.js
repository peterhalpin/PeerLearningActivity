import * as d3 from 'd3';
let headings = [];
let dataObject;

//in the cuture if there are multiple databases we can provide which data to use as a parameter
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

export const getData = function(){
    return dataObject;
}

export const getDataJSON = function(){
    return JSON.stringify(dataObject);
}