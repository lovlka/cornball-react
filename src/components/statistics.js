import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { getStatistics } from '../actions/statistics';
import Modal from './modal';

class Statistics extends Component {
  contextTypes = {
    intl: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getStatistics();
  }

  renderRow = (name, value, percent) => (
    <tr key={name}>
      <td><FormattedMessage id={`statistics.${name}`} defaultMessage={name} /></td>
      <td><FormattedNumber value={value} /></td>
      <td>{percent ? <FormattedNumber value={percent} /> : null}</td>
    </tr>
  );

  render() {
    const title = this.context.intl.formatMessage({ id: 'statistics.title', defaultMessage: 'Statistics' });

    return (
      <Modal title={title}>
        <table>
          <tbody>
            {this.props.statistics.map(item => this.renderRow(item.get('name'), item.get('value'), item.get('percent')))}
          </tbody>
        </table>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;

  return {
    statistics: app.get('statistics')
  };
};

const mapDispatchToProps = dispatch => ({
  getStatistics: () => {
    dispatch(getStatistics());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
