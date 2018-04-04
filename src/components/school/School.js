import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './School.css';

import Navigation from '../navigation';
/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  render() {
    console.log('Hæ');
    return (
      <section className="school">
        {
          if (this.props.schoolList.name === this.props.departmentList.heading) {
            this.props.departmentList.map(dep => {
              return (
                <ul>
                  <li>{dep.heading}</li>
                </ul>
              )
            })
          }
        }
      </section>
    );
  }
}
