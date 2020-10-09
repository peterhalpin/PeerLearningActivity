import * as d3 from 'd3';
let headings = [];
let dataObject;

d3.csv("/data/COVID_Data_2020_07_04.csv").then(function(data) {
    dataObject = data;
    headings = Object.keys(data[0]).filter(currHeading => {
        return currHeading !== 'id' && currHeading !== 'location' && currHeading !== 'date'
    });
});

export const getHeadings = function(){
    return headings;
}


export const getData = function(){
    return dataObject;
}
