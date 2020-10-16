import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { local } from 'd3';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      users: [],
      numOfUser: 0, 
      currNum: 0
    }
  }

  init() {
    if (this.state.numOfUser == 0) {
      console.log("init!!!!!");
      var len = document.getElementById("togetherjs-dock-participants").children.length;
      console.log("number of Users:" + len);
      this.setState({
        numOfUser: len
      });
      console.log("number of Users:" + this.state.numOfUser);
      var localUsers = [];
      for (var i = 0; i < len; i++) {
        console.log("iiiiii" + i);
        var element = document.getElementById("togetherjs-dock-participants").children[i];
        var temp = element.children[0];
        var info = temp.children[0];
        console.log(this.state.users.length);
        console.log(len);
        if (this.state.users.length < len) {
          console.log(info);
          localUsers.push(info.textContent);
        }
        console.log("userlist" + localUsers);
      }
      this.setState({
        users: localUsers
      });

    }
  }

  endTurn() { 
    this.setState({
      currNum: (this.state.currNum+1)%3
    })
  }

  render() {
    return (
      <div onClick={() => this.init()} className="ui raised center segment compact Header">
        <p>It's {this.state.users[this.state.currNum]} turn</p>
        <button onClick={() => this.endTurn() }>End Turn</button>
      </div>
    );

  }
}

export default Header;
