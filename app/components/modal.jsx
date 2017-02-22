import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {

   render() {
      return (
         <div className="modal fade" tabIndex="-1">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                     <h4 className="modal-title">{this.props.title}</h4>
                  </div>
                  <div className="modal-body">
                     {this.props.children}
                  </div>
                  <div className="modal-footer text-center">
                     <button type="button" className="btn btn-default modal-dismiss" data-dismiss="modal">{this.props.dismiss}</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }

}

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.element.isRequired,
   dismiss: PropTypes.string.isRequired
};