import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = React.memo((props) => {
    const { children, onClose } = props;

    const onKeyDown = (event) => {
      if(event.key === "Escape"){
        onClose();
      }
    };

    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      }
    }, [])

     return ReactDOM.createPortal(
      <ModalOverlay onClose={onClose}> 
          {children}
      </ModalOverlay>,
      modalRoot
    );
}) 

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;