import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { getHighScores, getAllTimeHigh } from '../actions/highscore';
import Modal from './modal';

class HighScore extends Component {
  constructor(props) {
    super(props);

    this.state = this.getDateState(new Date());
  }

  componentDidMount() {
    this.props.getHighScores(this.state.startDate, this.state.endDate);
    this.props.getAllTimeHigh();
  }

  getDateState = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      startDate: new Date(year, month, 1),
      endDate: new Date(year, month + 1, 0)
    };
  };

   previousMonth = (ev) => {
     ev.preventDefault();
     const date = new Date(this.state.startDate);
     date.setMonth(date.getMonth() - 1);
     const newState = this.getDateState(date);
     this.setState(newState, () => this.props.getHighScores(newState.startDate, newState.endDate));
   };

   nextMonth = (ev) => {
     ev.preventDefault();
     const date = new Date(this.state.startDate);
     date.setMonth(date.getMonth() + 1);
     const newState = this.getDateState(date);
     this.setState(newState, () => this.props.getHighScores(newState.startDate, newState.endDate));
   };

  renderRow = (index, item) => {
    const { name, date, value } = item.toJS();
    return (
      <tr key={index}>
        <td>{name}</td>
        <td><FormattedDate value={date} /></td>
        <td><FormattedNumber value={value} /></td>
      </tr>
    );
  };

  render() {
    const title = this.context.intl.formatMessage({ id: 'highscore.title', defaultMessage: 'Highscore' });
    const month = this.context.intl.formatDate(this.state.startDate, { month: 'long', year: 'numeric' });

    return (
      <Modal title={title} onClose={this.props.onClose}>
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

HighScore.contextTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { app } = state;

  return {
    highScores: app.get('highScores'),
    allTimeHigh: app.get('allTimeHigh')
  };
};

const mapDispatchToProps = dispatch => ({
  getHighScores: (start, end) => {
    dispatch(getHighScores(start.toISOString().substring(0, 10), end.toISOString().substring(0, 10)));
  },
  getAllTimeHigh: () => {
    dispatch(getAllTimeHigh());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);