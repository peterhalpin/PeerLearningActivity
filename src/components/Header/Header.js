import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="ui raised center segment compact Header">
        <p>It's student xx's turn</p>
      </div>
    );

  }
}

export default Header;
