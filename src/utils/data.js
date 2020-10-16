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