import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      users: [],
      numOfUser: 0, 
      currNum: 0
    }
  }

  loadPeers() {
    var togetherPeers = window.TogetherJS.require('peers');
    var myName = togetherPeers.Self.name;
    var myPeers = togetherPeers.getAllPeers();
    var names = [];
    names.push(myName);
    myPeers.forEach(p => {
      names.push(p.name);
    });
    names.sort(); // hack for everyone having the same order
    this.setState({
      users: names,
      numOfUser: names.length
    });
  }

  endTurn() { 
    this.setState({
      currNum: (this.state.currNum+1) % this.state.numOfUser
    })
  }

  render() {
    return (
      <div className="ui raised center segment compact Header">
        <p>It's {this.state.users[this.state.currNum]}'s turn</p>
        <button className="ui button" onClick={() => this.endTurn() }>End Turn</button>
        <button className="ui button" onClick={() => this.loadPeers() }>Refresh</button>
      </div>
    );

  }
}

export default Header;
