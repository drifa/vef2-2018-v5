import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  render() {
    const selectedNavItem = this.props.selectedNavItem;
    console.log("NAV: \n"+JSON.stringify(this.props));
    return (
      <nav className="navigation">
        {
          this.props.schoolList.map(school => {
            let className = 'nav-item';

            if (selectedNavItem === school.slug) {
              className = 'nav-item-bold';
            }
            return (
              <Link key={school.slug} to={school.link} onClick={this.props.setSelectedNavItem.bind(this, school.slug)} className={className}>{school.name}</Link>
            )
          })
        }
      </nav>
    );
  }
}

Navigation.propTypes = {
  schoolList: PropTypes.array,
  selectedNavItem: PropTypes.string,
  setSelectedNavItem: PropTypes.func,
}
