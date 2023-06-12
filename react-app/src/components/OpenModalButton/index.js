import React from 'react';
import { useModal } from '../../context/Modal';

import './OpenModalButton.css'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if(buttonText === 'Log In'){
    return  <button className='login-modal-button-class' onClick={onClick}>{buttonText}</button>
  }else if (buttonText === 'Sign Up'){
    return  <button className='signup-modal-button-class' onClick={onClick}>{buttonText}</button>
  }else{
    return (
      <button className='open-modal-button-class' onClick={onClick}>{buttonText}</button>
    );
  }
}

export default OpenModalButton;
