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
    var names = [];
    if (!this.props.testEnv) {
      var togetherPeers = window.TogetherJS.require('peers');
      var myPeers = togetherPeers.getAllPeers();
      names.push(togetherPeers.Self.name);
      myPeers.forEach(p => { names.push(p.name); });
    } else {
      // populate test data to get around TogetherJS dependency
      names = ['user1', 'user2', 'user3', 'user4'];
    }
    names.sort(); // hack for everyone having the same order
    this.setState({
      users: names,
      numOfUser: names.length
    });
    console.log(names);
    // together JS running update
    if (!this.props.testEnv && window.TogetherJS.running) {
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
    if (!this.props.testEnv && window.TogetherJS.running) {
      window.TogetherJS.send({
        type: 'turnUpdate',
        currNum: currNum
      })
    }
  }

  componentDidMount() {
    if (this.props.testEnv) return;
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
      <div className="Header" data-testid="Header">
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
