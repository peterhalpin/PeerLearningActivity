import React from 'react';
import './style.css';

function RadioButton(headings, checkedButton, handleChange) {
    let nameCount = -1;
    const labels = headings.map(currHeading => {
            nameCount ++;
            return(
        <div className="field" key = {nameCount}>
            <div className="ui radio checkbox">
                <input type="radio" name={'button' + nameCount} value={currHeading} checked={checkedButton === currHeading} onChange={handleChange} />
                <label>{currHeading}</label>
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
        //TODO: Get headings from data.js in the future
        this.headings = ['heading 1', 'heading 2', 'heading 3'];
        this.state={
            checkedButton: this.headings[0]
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event){
        console.log(event.target.value);
        this.setState({checkedButton: event.target.value});
        this.props.setData('selectedDataType', event.target.value);
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