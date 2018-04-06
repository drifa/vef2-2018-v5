import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './Home.css';

const APIurl = process.env.REACT_APP_SERVICE_URL;

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      stats: {},
    };
  }

  componentDidMount() {
    fetch(APIurl + 'stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          this.setState({
            stats: data.stats,
          })
        }
      });
  }

  render() {
    return (
      <div className="home">

        <h2>Tölfræði</h2>

        <table className="table-stats">
          <tbody>
            <tr>
              <td className="td-stats-heading">Fjöldi prófa</td>
              <td>{this.state.stats.numTests}</td>
            </tr>
            <tr>
              <td className="td-stats-heading">Fjöldi nemenda í öllum prófum</td>
              <td>{this.state.stats.numStudents}</td>
            </tr>
            <tr>
              <td className="td-stats-heading">Meðalfjöldi nemenda í prófi</td>
              <td>{this.state.stats.averageStudents}</td>
            </tr>
            <tr>
              <td className="td-stats-heading">Minnsti fjöldi nemenda í prófi</td>
              <td>{this.state.stats.min}</td>
            </tr>
            <tr>
              <td className="td-stats-heading">Mesti fjöldi nemenda í prófi</td>
              <td>{this.state.stats.max}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Home.propTypes = {
  
}
