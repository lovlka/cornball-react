import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { getStatistics } from '../actions/statistics';
import Modal from './modal';

class Statistics extends Component {
  componentDidMount() {
    this.props.getStatistics();
  }

  render() {
    const title = this.context.intl.formatMessage({ id: 'statistics.title', defaultMessage: 'Statistics' });

    return (
      <Modal title={title}>
        <table>
          <tbody>
            {this.props.statistics.map((item) => {
              return this.renderRow(item.get('name'), item.get('value'), item.get('percent'));
            })}
          </tbody>
        </table>
      </Modal>
    );
  }

  renderRow = (name, value, percent) => {
    return (
      <tr key={name}>
        <td><FormattedMessage id={`statistics.${name}`} defaultMessage={name} /></td>
        <td><FormattedNumber value={value} /></td>
        <td>{percent ? <FormattedNumber value={percent} /> : null}</td>
      </tr>
    );
  };
}

Statistics.contextTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { app } = state;

  return {
    statistics: app.get('statistics')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatistics: () => {
      dispatch(getStatistics());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
