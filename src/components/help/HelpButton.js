import React from 'react';
import './style.css';

class HelpButton extends React.Component {
    render(){
        return(
            <div data-testid="helpButton" className="ui button toolTip" data-tooltip="Click on a state to select it. Use the slider and radio buttons below to filter the data by date and type." data-position="right center"  data-variation="wide">
                <i className="question circle icon helpButton"></i>
            </div>
        )
    }
}

export default HelpButton;