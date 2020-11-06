import React from 'react';
import { Button } from 'semantic-ui-react';
import './style.css';
import {mapIntToDate} from '../../utils/data.js';

class DataDisplay extends React.Component {
    render() {
        return(
            <div className="ui raised segment compact dataDisplay">
                <p><span className='capitalize'>{this.props.selectedDataType}</span> in {this.props.selectedState} on {mapIntToDate(this.props.selectedDate)}:</p>
                <p className='dataDisplayValue'>{this.props.currentData}</p>
                <Button onClick={this.props.sendData}>Send</Button>
            </div>


        )
    }
}

export default DataDisplay;
