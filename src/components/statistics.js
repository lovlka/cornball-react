import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import { fetchStatistics } from '../actions/statistics';
import { getStatistics } from '../helpers/selectors';
import Modal from './modal';
import Loader from './loader';

const StatisticsRow = ({ name, value, percent }) => (
  <tr>
    <td><FormattedMessage id={`statistics.${name}`} /></td>
    <td><FormattedNumber value={value} /></td>
    <td>{percent > 0 && <FormattedNumber value={percent} style="percent" minimumFractionDigits={2} />}</td>
  </tr>
);

const Statistics = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const statistics = useSelector(getStatistics);

  useEffect(() => {
    dispatch(fetchStatistics())
      .then(() => setLoading(false));
  }, []);

  const title = intl.formatMessage({ id: 'statistics.title', defaultMessage: 'Statistics' });

  return (
    <Modal title={title} onClose={onClose}>
      {loading && <Loader />}
      <table>
        <tbody>
          {statistics.map(item => <StatisticsRow key={item.name} {...item} />)}
        </tbody>
      </table>
    </Modal>
  );
};

export default Statistics;
