import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import RadioButtonPanel from './component/dataPanel/RadioButtonPanel'
import { getHeadings } from './utils/data';


let headings = [];
headings = getHeadings(); 
setTimeout(function(headings){
  ReactDOM.render(
    <React.StrictMode>
      <App />
      <RadioButtonPanel ref={(pageComponent) => {window.pageComponent = pageComponent}} headings={headings}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
