import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = React.memo((props) => {
    const { children, handleClose } = props;

    const onKeyDown = (event) => {
      if(event.key === "Escape"){
        handleClose();
      }
    };

    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      }
    }, [])

     return ReactDOM.createPortal(
       <div>
        {children},
        <ModalOverlay handleClose={handleClose}> </ModalOverlay>
      </div>,
      modalRoot
    );
}) 

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;