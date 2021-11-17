import React from "react";
import modalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = React.memo((props) => {
    const {handleClose} = props;
    return (
      <div className={modalOverlayStyle.modalOverlay} onClick={handleClose} />
    );
}) 

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
};


export default ModalOverlay;