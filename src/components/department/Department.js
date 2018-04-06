import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableSize: this.props.department.tests.length,
      showTable: false,
    };
  }

  toggle() {
    const copiedState = Object.assign({}, this.state);
    copiedState.showTable = !this.state.showTable;
    this.setState(copiedState);
  }

  render() {
    let table;
    let content;
    if (this.state.showTable) {
      content = '➖ ';
      table = (
        <table className="table-department">
          <tbody>
            <tr className='tr-heading'>
              <th>Auðkenni</th>
              <th>Námskeið</th>
              <th>Fjöldi</th>
              <th>Dagsetning</th>
            </tr>
            {
              this.props.department.tests.map(test => {
                return (
                  <tr key={test.course} className="tr-odd">
                    <td>{test.course}</td>
                    <td>{test.name}</td>
                    <td>{test.students}</td>
                    <td>{test.date}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      );
    } else {
      content = '➕ ';
      table = (
        <div></div>
      )
    }


    return (
      <section className="department">
        <div>
         {content}
          <a href="#" onClick={this.toggle.bind(this)}>
            {this.props.department.heading}
          </a>
        </div>
        <div className='table-div'>
          {table}
        </div>
      </section>
    );
  }
}

Department.propTypes = {
  departments: PropTypes.array,
}
