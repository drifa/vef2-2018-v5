import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  render() {
    return (
      <Navbar className="navigation">
        <Navbar.Header>
          <Navbar.Brand>
            <h1>Próftöflur</h1>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {
            this.props.schoolList.map(school => {
              return (
                <NavItem>
                  <Link key={school.slug} to={school.link} className="nav-item">{school.name}</Link>
                </NavItem>
              )
            })
          }
        </Nav>
      </Navbar>
    );
  }
}
