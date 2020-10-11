import React from 'react';
import './style.css';

class QAPanel extends React.Component {

    constructor(props) {
        super(props);
        //TODO: Get headings from data.js in the future
        this.headings = ['heading 1', 'heading 2', 'heading 3'];
        this.state={
            checkedButton: this.headings[0]
        }
        this.handleChange = this.handleChange.bind(this);
        
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
            <div className="ui raised segment compact qaPanel">
                <p>here</p>
            </div>


        )
    }
}

export default QAPanel;