import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import CommonFeed from './commonfeed';
import Customize from './customize';
import PersonalFeed from './personalfeed';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">News Me!</h1>
          </header>
          <Route path="/" component={Home} />
          <div className="row">
            <div className="small-3 columns">&nbsp;</div>
            <div className="row">
              <div className="small-6 columns">
                <div className="card">
                  <Route exact path="/" component={CommonFeed} />
                  <Route exact path="/customize" component={Customize} />
                  <Route exact path="/personalfeed/" component={PersonalFeed} />
                </div>
              </div>
              <div className="small-3 columns">&nbsp;</div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      top20: []
    }
  }

  render() {
    return (
      <div className="Home">
        <ul className="filter-nav">
          <li className="filter-nav-entry"><NavLink exact to="/" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Home</NavLink></li>
          <li className="filter-nav-entry"><NavLink exact to="/customize" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Customize</NavLink></li>
          <li className="filter-nav-entry"><NavLink exact to="/personalfeed" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Personal Feed</NavLink></li>
        </ul>
      </div>
    )
  }
}

export default App;
