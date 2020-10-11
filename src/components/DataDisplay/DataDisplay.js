import React from 'react';
import './style.css';

class DataDisplay extends React.Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div className="ui raised segment compact dataDisplay">
                <p>{this.props.selectedDataType} in Alabama on {this.props.selectedDate}:</p>
                <p className='dataDisplayValue'>14</p>
            </div>


        )
    }
}

export default DataDisplay;