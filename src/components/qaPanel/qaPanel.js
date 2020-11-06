import React from 'react';
import './qaPanel.css';

class QaPanel extends React.Component {
  render() {
      return(
        <iframe data-testid="QaPanel" className='googleForm' title='Peer Learning Activity' src="https://docs.google.com/forms/d/e/1FAIpQLSfHF_EJAfLIodzHOImewciEIAJomAsrKbXvYDRu27n6DyMtaQ/viewform?embedded=true" width="640" height="200" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
      )
  }
}

//in the future, use className freebirdFormviewerComponentsQuestionBaseDescription and get the first character in the string to get the number of allowed items to log, then post message it up. 

export default QaPanel;
