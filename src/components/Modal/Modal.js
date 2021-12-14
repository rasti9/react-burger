import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
    const { header, handleClose, children} = props;

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
       <>
      <div className={modalStyle.modal}>
          <div className={modalStyle.header}>
             <p className="text text_type_main-large">{header}</p>
            <CloseIcon onClick={handleClose}/>
          </div>
          {children}
      </div>
      <ModalOverlay handleClose={handleClose}></ModalOverlay>
      </>,
      modalRoot
    );
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;