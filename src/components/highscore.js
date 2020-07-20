import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'halogenium';
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { getHighScores, getAllTimeHigh } from '../actions/highscore';
import Modal from './modal';

class HighScore extends Component {
  constructor(props) {
    super(props);

    const period = new Date();
    period.setDate(1);

    this.state = {
      period,
      loading: true
    };
  }

  componentDidMount() {
    Promise.all([
      this.props.getHighScores(this.state.period),
      this.props.getAllTimeHigh()
    ]).then(() => this.setState({ loading: false }));
  }

  getHighScores(period) {
    this.setState({ loading: true });
    this.props.getHighScores(period)
      .then(() => this.setState({ loading: false }));
  }

  previousMonth = (ev) => {
    ev.preventDefault();
    const date = new Date(this.state.period);
    date.setMonth(date.getMonth() - 1);
    const newState = { period: date };
    this.setState(newState, () => this.getHighScores(newState.period));
  };

  nextMonth = (ev) => {
    ev.preventDefault();
    const date = new Date(this.state.period);
    date.setMonth(date.getMonth() + 1);
    const newState = { period: date };
    this.setState(newState, () => this.getHighScores(newState.period));
  };

  renderRow = (index, item) => {
    const { name, date, score } = item.toJS();
    return (
      <tr key={index}>
        <td>{name}</td>
        <td><FormattedDate value={date} /></td>
        <td><FormattedNumber value={score} /></td>
      </tr>
    );
  };

  render() {
    const { intl } = this.props;
    const { period, loading } = this.state;

    const title = intl.formatMessage({ id: 'highscore.title', defaultMessage: 'Highscore' });
    const month = intl.formatDate(period, { month: 'long', year: 'numeric' });

    return (
      <Modal title={title} onClose={this.props.onClose}>
        {loading && <ClipLoader id="modal-loader" color="#ddd" size={20} />}
        <div className="row">
          <div className="column">
            <table>
              <tbody>
                <tr>
                  <td colSpan="3"><FormattedMessage id="highscore.alltime" defaultMessage="All time high" /></td>
                </tr>
                {this.props.allTimeHigh.map((item, index) => this.renderRow(index, item))}
              </tbody>
            </table>
          </div>
          <div className="column">
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <nav>
                      <button type="button" onClick={this.previousMonth}>&laquo;</button>
                      <button type="button" onClick={this.nextMonth}>&raquo;</button>
                    </nav>
                    <FormattedMessage id="highscore.month" defaultMessage="Best in {month}" values={{ month }} />
                  </td>
                </tr>
                {this.props.highScores.map((item, index) => this.renderRow(index, item))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;

  return {
    highScores: app.get('highScores'),
    allTimeHigh: app.get('allTimeHigh')
  };
};

const mapDispatchToProps = dispatch => ({
  getHighScores: period => dispatch(getHighScores(period)),
  getAllTimeHigh: () => dispatch(getAllTimeHigh())
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HighScore));
