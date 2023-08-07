import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import React, { Component } from 'react';
import { fetchImages } from '../services/Api';
import { Button } from './Button';
import { Circles } from 'react-loader-spinner';
import { Modal } from './Modal';
// axios.defaults.headers.common['Authorization'] = API_KEY;

export class App extends Component {
  state = {
    searchWord: 'world',
    hits: [],
    total: '',
    totalHits: '',
    per_page: 12,
    page: 1,
    isLoading: false,
    showButton: false,
    // showModal: false,
    largeImageURL: '',
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWord !== this.state.searchWord ||
      this.state.page !== prevState.page
    ) {
      const { searchWord: q, per_page, page } = this.state;
      this.setState({ isLoading: true });
      try {
        this.setState({ showButton: false });
        const res = await fetchImages({ q, per_page, page });
        console.log(res.hits);
        this.setState({
          hits:
            this.state.page === 1 ? res.hits : [...prevState.hits, ...res.hits],
          total: res.total,
          totalHits: res.totalHits,
          page,
          showButton:
            page >= res.totalHits / per_page || res.total === 0 ? false : true,
        });
        console.log(res.total);
        console.log(this.state.per_page);
      } catch {
        console.log('catch');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearchInput = word => {
    if (!word) {
      alert('Enter something!');
      return;
    }
    if (word !== this.state.searchWord) {
      this.setState({ searchWord: word, page: 1 });
    }
  };

  onPageUpload = async () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
    // const { searchWord: q, per_page, page } = this.state;
  };

  toggleModal = largeImageURL => {
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ largeImageURL: largeImageURL ? largeImageURL : '' });
    // this.setState({ largeImageURL });
  };

  render() {
    const { isLoading, hits, totalHits, total, largeImageURL } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearchInput} />
        {/* <button type="button" onClick={this.toggleModal}>
          Open Window
        </button> */}
        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <img
              className="modal"
              src={this.state.largeImageURL}
              alt="la-la-la"
            />
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
          onModal={this.toggleModal}
          total={total}
          hits={hits}
          totalHits={totalHits}
        />

        {this.state.showButton && <Button onPageUpload={this.onPageUpload} />}
      </div>
    );
  }
}
