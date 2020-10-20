import * as d3 from 'd3';
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