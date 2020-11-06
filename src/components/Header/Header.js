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
    console.log("load peers");
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
    console.log(names);
    // together JS running update
    if (window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'headerRefresh',
        users: names,
        numOfUser: names.length,
      })
    }
  }

  endTurn() { 
    const currNum = (this.state.currNum+1) % this.state.numOfUser;
    this.setState({
      currNum: currNum
    })
    if (window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'turnUpdate',
        currNum: currNum
      })
    }
  }

  componentDidMount() {
    window.TogetherJS.hub.on('headerRefresh', msg => {
      if (!msg.sameUrl) return;
      this.setState( {
        users: msg.users,
        numOfUser: msg.numOfUser,
      });
    });
    window.TogetherJS.hub.on('turnUpdate', msg => {
      if (!msg.sameUrl) return;
      this.setState( {
        currNum: msg.currNum
      });
    })
  }

  render() {
    return (
      <div className="Header">
        <div className="ui raised segment Header">
          <p>It's {this.state.users[this.state.currNum]}'s turn</p>
          <button className="ui button" onClick={() => this.endTurn() }>End Turn</button>
          <button className="ui button" onClick={() => this.loadPeers() }>Refresh</button>
        </div>
      </div>
    );

  }
}

export default Header;
