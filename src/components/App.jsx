import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import React, { useState, useEffect, useRef } from 'react';
import { fetchImages } from '../services/Api';
import { Button } from './Button';
import { Circles } from 'react-loader-spinner';
import { Modal } from './Modal';

export const App = () => {
  const firstRend = useRef(true);
  const [searchWord, setSearchWord] = useState('');
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState('');
  const [totalHits, setTotalHits] = useState('');
  const [per_page, setPer_page] = useState(12);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  // setPer_page(5);

  const getIMG = async () => {
    setIsLoading(true);
    try {
      console.log('ura');
      setShowButton(false);
      const res = await fetchImages({ q: searchWord, per_page, page });
      setHits(page === 1 ? res.hits : [...hits, ...res.hits]);
      setTotal(res.total);
      setTotalHits(res.totalHits);
      // setPage();
      setShowButton(
        page >= res.totalHits / per_page || res.total === 0 ? false : true
      );
      // });
    } catch {
      console.log('catch');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    getIMG();
  }, [searchWord, page]);

  const handleSearchInput = word => {
    if (!word) {
      alert('Enter something!');
      return;
    }
    if (word !== searchWord) {
      console.log(word);
      setSearchWord(word);
      setPage(1);
    }
  };

  const onPageUpload = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = largeImageURL => {
    setLargeImageURL(largeImageURL ? largeImageURL : '');
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchInput} />
      {/* <button type="button" onClick={toggleModal}>
          Open Window
        </button> */}
      {largeImageURL && (
        // <Modal onClose={toggleModal}>
        <Modal onClose={() => toggleModal('')}>
          <img className="modal" src={largeImageURL} alt="la-la-la" />
        </Modal>
      )}

      {isLoading && (
        <div className="loader">
          <Circles
            height="80"
            width="80"
            color="#05da1e"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <ImageGallery
        onModal={toggleModal}
        total={total}
        hits={hits}
        totalHits={totalHits}
      />

      {showButton && <Button onPageUpload={onPageUpload} />}
    </div>
  );
};
