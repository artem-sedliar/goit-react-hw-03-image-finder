import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    keyword: '',
  };

  onSubmit = keyword => {
    this.setState({ keyword });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery keyword={this.state.keyword} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
