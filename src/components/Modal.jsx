import React, { Component, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
i;

const modalRoot = document.querySelector('#modal-root');
export const Modal = () => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleEscape);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleEscape);
  // }

  // handleEscape = e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      // this.props.onClose();
    }
  };

  // render() {
  return createPortal(
    <div>
      <div className="overlay" onClick={handleBackDropClick}>
        <div className="modal">{props.children}</div>
      </div>
    </div>,
    modalRoot
  );
  // }
};

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };
