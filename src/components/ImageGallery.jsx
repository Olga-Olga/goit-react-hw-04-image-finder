import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ hits, onModal }) => {
  return (
    <div>
      <ul className="imageGallery">
        {hits.map(pic => (
          <ImageGalleryItem
            onModal={onModal}
            key={pic.id}
            webformatURL={pic.webformatURL}
            largeImageURL={pic.largeImageURL}
          />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
};
