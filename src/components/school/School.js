import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './School.css';

import Navigation from '../navigation';
import Department from '../department';
import Home from '../home';
import NotFound from '../not-found'

const APIurl = process.env.REACT_APP_SERVICE_URL;
/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  constructor() {
    super();

    this.state = {
      departmentList: [],
      departments: [],
    };
  }

  fetchDepartments(props) {
    const schoolExists = props.schools
      .find(school => school.slug === props.slug);
    if (!schoolExists) { return }

    fetch(APIurl + props.slug)
      .then(res => res.json())
      .then(data => {
        if (data.school) {
          this.setState({
            departmentList: data.school,
            departments: data.school.departments,
          });
        }
      });
  }

  componentDidMount() {
    console.log("MOUNT");
    this.props.setSelectedNavItem(this.props.slug);
    this.fetchDepartments(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedNavItem !== newProps.selectedNavItem || this.props.selectedNavItem === '') {
      newProps.setSelectedNavItem(newProps.slug);
    }

    this.fetchDepartments(newProps);
  }

  render() {
    const schoolExists = this.props.schools
      .find(school => school.slug === this.props.slug)

    if (schoolExists) {
      const departments = this.state.departments
        .map(dep => {
          return (
            <li key={dep.heading}>
              <Department department={dep} />
              <hr/>
            </li>
          )
        })
      return (
        <section className="school">

          <Helmet>
            <title>{this.state.departmentList.heading}</title>
            <meta name="description" content="Helmet application" />
          </Helmet>

          <h2>{this.state.departmentList.heading}</h2>
          <ul className="schools-list">
            {
              departments
            }
          </ul>
          <Link to='/' className='home-button' onClick={this.props.setSelectedNavItem.bind(this, '')}>Heim</Link>
        </section>
      );
    } else {
      return (
        <NotFound />
      )
    }

  }
}

School.propTypes = {
  slug: PropTypes.string,
  schools: PropTypes.array,
  setSelectedNavItem: PropTypes.func,
}
