import React from 'react';
import './style.css';

class DataDisplay extends React.Component {

    constructor(props) {
        super(props);
        
    }

    handleClick(heading){
        this.setState({checkedButton: heading})
    }

    handleChange(event){
        this.setState({checkedButton: event.target.value});
    }
    
    // call window.pageComponent.getCheckedButton() to get the checked button
    getCheckedButton(){
        return this.state.checkedButton;
    }

    render() {
        return(
            <div className="ui raised segment compact dataDisplay">
                <p>Active Cases in Alabama on July 7:</p>
                <p className='dataDisplayValue'>14</p>
            </div>


        )
    }
}

export default DataDisplay;