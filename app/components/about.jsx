import React, { Component, PropTypes } from 'react';
import Modal from './modal';

export default class About extends Component {

   render() {
      return (
         <Modal title="Om Lantisen" dismiss="Stäng">
            <article>
               <p>Lantisen går ut på att lägga samtliga kort i ordning från 2 till kung med en färg på varje rad. Vilken färg som läggs på respektive rad spelar ingen roll. Tvåor kan endast läggas i en lucka längst till vänster på spelplanen. Övriga kort kan endast läggas i en lucka till höger om det kort i samma färg som kommer före i ordningen. I en lucka efter kung kan inget kort läggas.</p>
               <p>Dra ett kort till rätt lucka eller dubbelklicka på kortet för att automatiskt hitta rätt plats. Klicka på en lucka så blinkar det kort som kan läggas i luckan.</p>
               <p>Bli fan av Lantisen på Facebook! Där har du möjlighet att framföra synpunkter eller komma i kontakt med mig. Tack för att du spelar Lantisen!</p>
            </article>
         </Modal>
      );
   }

}
