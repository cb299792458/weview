import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import signin from '../../signin.png'
import './LoginForm.css'


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="login-modal">
      <img src={signin} alt='' onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;

