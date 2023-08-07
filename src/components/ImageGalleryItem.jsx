import React from 'react';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ largeImageURL, webformatURL, onModal }) => {
  return (
    <li className="gallery-item imageGalleryItem">
      <img
        className="imageGalleryItem-image"
        onClick={() => onModal(largeImageURL)}
        src={webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onShonModal: PropTypes.func.isRequired,
};
