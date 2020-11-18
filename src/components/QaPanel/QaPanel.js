import React from "react";
import "./QaPanel.css";

class QaPanel extends React.Component {
  render() {
    // replace this variable with the correct google form link, more info in README. Copy the src and replace the variable down below.
    const googleFormLink =
      "https://docs.google.com/forms/d/e/1FAIpQLSfHF_EJAfLIodzHOImewciEIAJomAsrKbXvYDRu27n6DyMtaQ/viewform?embedded=true";
    return (
      <iframe
        data-testid="QaPanel"
        className="googleForm"
        title="Peer Learning Activity"
        src={googleFormLink}
        width="640"
        height="200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
    );
  }
}

export default QaPanel;
