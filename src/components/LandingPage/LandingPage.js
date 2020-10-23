import React from 'react';
import './landingPage.css';

function LandingPage(props) {
  return(
    <div className='LandingPage' data-testid="LandingPage">
    <h1 className='landingHeader'>Activity: Covid-19 Pandemic Map</h1>
    <div className='ui raised segment compact instructions'>
    <h3 className='landingHeader'>Instructions:</h3>
    <ul>
      <li>Use the data provided by the map to answer the questions your instructor provided.</li>
      <li>The slider and buttons on the left control what kind of data the map displays.</li>
      <li>Click **submit** on the right panel to store the currently selected information in the table.</li>
      <li>Clicking submit ends your turn. Only use the data panelsalter the data that the map displays and press submit when it is your turn. </li>
    </ul>
    </div>
    <button onClick={props.onClick} className="ui button landingButton">
      Click here to begin
    </button>
  </div>
  )
}
// const LandingPage = () => (
//   <div className='LandingPage' data-testid="LandingPage">
//     <h1 className='landingHeader'>Activity: Covid-19 Pandemic Map</h1>
//     <div className='ui raised segment compact instructions'>
//     <h3 className='landingHeader'>Instructions:</h3>
//     <ul>
//       <li>Use the data provided by the map to answer the questions your instructor provided.</li>
//       <li>The slider and buttons on the left control what kind of data the map displays.</li>
//       <li>Click **submit** on the right panel to store the currently selected information in the table.</li>
//       <li>Clicking submit ends your turn. Only use the data panelsalter the data that the map displays and press submit when it is your turn. </li>
//     </ul>
//     </div>
//     <button onClick={this.props.handleClick} className="ui button">
//       Click here to begin
//     </button>
//   </div>
// );

LandingPage.propTypes = {};

LandingPage.defaultProps = {};

export default LandingPage;
