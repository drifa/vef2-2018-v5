import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

const API = process.env.REACT_APP_SERVICE_URL;

class App extends Component {

  constructor() {
    super();
    this.state = {
      schoolList: [],
      departmentList: [],
      departments: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data.schools) {
          fetch(API + '/:slug')
            .then(res => res.json())
            .then(data => {
              if (data.school) {
                this.setState({
                  departmentList: data.school,
                  departments: data.school.departments,
                  schoolList: data.schools,
                });
              }
            });
        }
      });
  }

  render() {
    return (
      <Router>
        <main className="app">
          <Navigation schoolList = {this.state.schoolList} />
          <Route exact={true} path="/" component={Home} />
          <Route
            schoolList = {this.state.schoolList}
            departmentList = {this.state.departmentList}
            departments = {this.state.departments}
            exact={true}
            path="/:slug"
            component={School}
          />
        </main>
      </Router>
    );
  }
}

export default App;
