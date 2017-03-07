import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { getHighScores, getAllTimeHigh } from '../actions/highscore';
import Modal from './modal';

class HighScore extends Component {

   componentDidMount() {
      this.props.getHighScores();
      this.props.getAllTimeHigh();
   }

   render() {
      return (
         <Modal title="Highscore" dismiss="Stäng">
            <div className="row">
               <div className="column">
                  <table>
                     <tbody>
                     <tr>
                        <td colSpan="3">Bäst genom tiderna</td>
                     </tr>
                     {this.props.allTimeHigh.map((item, index) => {
                        return this.renderRow(index, item);
                     })}
                     </tbody>
                  </table>
               </div>
               <div className="column">
                  <table>
                     <tbody>
                     <tr>
                        <td colSpan="3">Bäst i mars 2017</td>
                     </tr>
                     {this.props.highScores.map((item, index) => {
                        return this.renderRow(index, item);
                     })}
                     </tbody>
                  </table>
               </div>
            </div>
         </Modal>
      );
   }

   renderRow(index, item) {
      const {name, date, value} = item.toJS();
      return (
         <tr key={index}>
            <td>{name}</td>
            <td><FormattedDate value={date} /></td>
            <td><FormattedNumber value={value} /></td>
         </tr>
      );
   }

}

const mapStateToProps = (state) => {
   const {app} = state;

   return {
      highScores: app.get('highScores'),
      allTimeHigh: app.get('allTimeHigh')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getHighScores: (start, end) => {
         dispatch(getHighScores(start, end));
      },
      getAllTimeHigh: () => {
         dispatch(getAllTimeHigh());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);