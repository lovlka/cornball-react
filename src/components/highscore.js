import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { fetchHighScores, fetchAllTimeHigh } from '../actions/highscore';
import { getHighScores, getAllTimeHigh } from '../helpers/selectors';
import Modal from './modal';
import Loader from './loader';

const HighScoreRow = ({ name, date, score }) => (
  <tr>
    <td>{name}</td>
    <td><FormattedDate value={date} /></td>
    <td><FormattedNumber value={score} /></td>
  </tr>
);

const HighScore = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const initialDate = new Date();
  initialDate.setDate(1);

  const [period, setPeriod] = useState(initialDate);
  const [loading, setLoading] = useState(true);
  const highScores = useSelector(getHighScores);
  const allTimeHigh = useSelector(getAllTimeHigh);

  useEffect(() => {
    Promise.all([
      dispatch(fetchHighScores(period)),
      dispatch(fetchAllTimeHigh())
    ]).then(() => setLoading(false));
  }, []);

  const previousMonth = (ev) => {
    ev.preventDefault();
    const date = new Date(period);
    date.setMonth(date.getMonth() - 1);
    setPeriod(date);
    setLoading(true);
    dispatch(fetchHighScores(date))
      .then(() => setLoading(false));
  };

  const nextMonth = (ev) => {
    ev.preventDefault();
    const date = new Date(period);
    date.setMonth(date.getMonth() + 1);
    setPeriod(date);
    setLoading(true);
    dispatch(fetchHighScores(date))
      .then(() => setLoading(false));
  };

  const title = intl.formatMessage({ id: 'highscore.title', defaultMessage: 'Highscore' });
  const month = intl.formatDate(period, { month: 'long', year: 'numeric' });

  return (
    <Modal title={title} onClose={onClose}>
      {loading && <Loader />}
      <div className="row">
        <div className="column">
          <table>
            <tbody>
              <tr>
                <td colSpan="3"><FormattedMessage id="highscore.alltime" defaultMessage="All time high" /></td>
              </tr>
              {allTimeHigh.map((item, index) => <HighScoreRow key={index} {...item} />)}
            </tbody>
          </table>
        </div>
        <div className="column">
          <table>
            <tbody>
              <tr>
                <td colSpan="3">
                  <nav>
                    <button type="button" onClick={previousMonth}>&laquo;</button>
                    <button type="button" onClick={nextMonth}>&raquo;</button>
                  </nav>
                  <FormattedMessage id="highscore.month" defaultMessage="Best in {month}" values={{ month }} />
                </td>
              </tr>
              {highScores.map((item, index) => <HighScoreRow key={index} {...item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default HighScore;
