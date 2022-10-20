import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ModalForm from './ModalForm';
import signin from '../../signin.png'
import './ModalForm.css'


function ModalIndex() {
  const [showModal, setShowModal] = useState(false);

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
}

export default ModalIndex;

