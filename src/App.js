import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

const APIurl = process.env.REACT_APP_SERVICE_URL;

class App extends Component {

  constructor() {
    super();
    this.state = {
      schoolList: [],
      selectedNavItem: '',
    };
  }

  componentWillMount() {
    console.log("APP MOUNT");
    fetch(APIurl)
      .then(res => res.json())
      .then(data => {
        if (data.schools) {
          const copiedState = Object.assign({}, this.state);
          copiedState.schoolList = data.schools;
          this.setState(copiedState);
        }
      });
  }

  setSelectedNavItem(slug) {
    console.log("NEW SLUG: "+ slug);
    const copiedState = Object.assign({}, this.state);
    copiedState.selectedNavItem = slug;
    this.setState(copiedState);
  }

  render() {
    const schoolList = this.state.schoolList;
    const setSelectedNavItem = this.setSelectedNavItem;
    const selectedNavItem = this.state.selectedNavItem;
    return (
      <Router>
        <main className="app">
          <Helmet>
            <title>Próftöflur</title>
            <meta name="description" content="Helmet application" />
          </Helmet>
          <div className="title">
            <h1>Próftöflur</h1>
          </div>
          <Navigation schoolList={schoolList} selectedNavItem={this.state.selectedNavItem} setSelectedNavItem={setSelectedNavItem.bind(this)}/>
          <Route exact={true} path="/" component={Home} />
          <Route path="/:slug" render={ (props) => {
            return (
              <School schools={schoolList} slug={props.match.params.slug} setSelectedNavItem={setSelectedNavItem.bind(this)}/>
            )
          }}
          />
        </main>
      </Router>
    );
  }
}

App.propTypes = {
  match: PropTypes.object,
}

export default App;
