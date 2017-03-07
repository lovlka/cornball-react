import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { getStatistics } from '../actions/statistics';
import Modal from './modal';

class Statistics extends Component {

   componentDidMount() {
      this.props.getStatistics();
   }

   render() {
      return (
         <Modal title="Statistics" dismiss="Stäng">
            <table>
               <tbody>
               {this.props.statistics.map(item => {
                  return this.renderRow(item.get('name'), item.get('value'));
               })}
               </tbody>
            </table>
         </Modal>
      );
   }

   renderRow(title, value, percent) {
      return (
         <tr key={title}>
            <td><FormattedMessage id={'statistics.' + title} defaultMessage={title} /></td>
            <td><FormattedNumber value={value} /></td>
            <td>{percent ? <FormattedNumber value={percent} /> : null}</td>
         </tr>
      );
   }

}

const mapStateToProps = (state) => {
   const {app} = state;

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