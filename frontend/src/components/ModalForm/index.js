import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ModalForm from './ModalForm';
import signin from '../../signin.png'
import edit from '../../edit.png'
import './ModalForm.css'
import { useSelector } from 'react-redux';


function ModalIndex() {
  
  const [showModal, setShowModal] = useState(false);
  console.log("In Modal Index");
  const sessionUser = useSelector(state => state.session.user);

  if(!sessionUser){
    return (
      <div id="login-modal">
        <img src={signin} alt='' onClick={() => setShowModal(true)} />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ModalForm />
          </Modal>
        )}
      </div>
    );
  } else {
    return(
      
      <div id="edit-modal">
        <img src={edit} alt='' onClick={() => setShowModal(true)} />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ModalForm />
          </Modal>
        )}
      </div>
    );
  }
}

export default ModalIndex;

