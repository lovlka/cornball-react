import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ClipLoader } from 'halogenium';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { getStatistics } from '../actions/statistics';
import Modal from './modal';

class Statistics extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.getStatistics()
      .then(() => this.setState({ loading: false }));
  }

  renderRow = (name, value, percent) => (
    <tr key={name}>
      <td><FormattedMessage id={`statistics.${name}`} /></td>
      <td><FormattedNumber value={value} /></td>
      <td>{percent > 0 && <FormattedNumber value={percent} style="percent" minimumFractionDigits={2} />}</td>
    </tr>
  );

  render() {
    const { intl } = this.context;
    const { loading } = this.state;

    const title = intl.formatMessage({ id: 'statistics.title', defaultMessage: 'Statistics' });

    return (
      <Modal title={title} onClose={this.props.onClose}>
        {loading && <ClipLoader id="modal-loader" color="#ddd" size={20} />}
        <table>
          <tbody>
            {this.props.statistics.map(item => this.renderRow(item.get('name'), item.get('value'), item.get('percent')))}
          </tbody>
        </table>
      </Modal>
    );
  }
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

const mapDispatchToProps = dispatch => ({
  getStatistics: () => dispatch(getStatistics())
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
