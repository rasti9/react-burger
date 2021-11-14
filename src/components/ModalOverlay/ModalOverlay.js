import React from "react";
import modalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = React.memo((props) => {
    const {children, onClose} = props;
    return (
      <div className={modalOverlayStyle.modalOverlay} onClick={onClose}>
        {children}
      </div>
    );
}) 

ModalOverlay.propTypes = {
  children: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};


export default ModalOverlay;