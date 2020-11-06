import React from 'react';
import './style.css';
import {getDefaultHeading, getStyledHeadings} from '../../utils/data.js';

function RadioButton(headings, checkedButton, handleChange) {
    let nameCount = -1;
    const labels = headings.map(currHeading => {
            nameCount ++;
            return(
        <div className="field" key = {nameCount}>
            <div className="ui radio checkbox">
                <input type="radio" name={'button'} value={currHeading} checked={checkedButton === currHeading} onChange={handleChange} />
                <label><p className='capitalize'>{currHeading}</p></label>
            </div>
        </div>
            )
    })
    return(
        labels
    )
}

class RadioButtonPanel extends React.Component {

    constructor(props) {
        super(props);
        this.headings = getStyledHeadings();
        this.state={
            checkedButton: getDefaultHeading()
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event){
        this.setState({checkedButton: event.target.value});
        // this.props.setData('selectedDataType', event.target.value);
        this.props.changeDataType(event.target.value);
    }
    
    // call window.pageComponent.getCheckedButton() to get the checked button or:: window.radioButtonComponent.getCheckedButton()
    getCheckedButton(){
        return this.state.checkedButton;
    }

    render() {
        return(
            <div ref={(childComponent) => {window.radioButtonComponent = childComponent}} className="ui raised segment compact radioPanel">
                <div className="ui form">
                    <div className="grouped fields">
                        {RadioButton(this.headings, this.state.checkedButton, this.handleChange)}
                    </div>
                </div>
            </div>


        )
    }
}

export default RadioButtonPanel;
