import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { getImages } from 'service/api';

export default class ImageGallery extends Component {
  static propTypes = { keyword: PropTypes.string.isRequired };

  state = { images: [], loading: false };

  componentDidUpdate(prevProps) {
    if (prevProps.keyword !== this.props.keyword) {
      this.setState({ images: [], loading: true, showLoadMore: false });

      getImages(this.props.keyword, 1)
        .then(r => {
          if (r.total === 0) {
            toast.info('No results were found for your request!');
            return;
          }
          if (r.total > 12) {
            this.setState({ showLoadMore: true });
          }
          this.setState({ images: r.hits });
        })
        .catch(console.log)
        .then(this.setState({ loading: false }));
    }
  }

  onLoadMoreClick = () => {
    this.setState({ loading: true });

    const page = this.state.images.length / 12 + 1;

    getImages(this.props.keyword, page)
      .then(r => {
        if (r.total - this.state.images.length <= 12) {
          this.setState({ showLoadMore: false });
        }
        this.setState(state => {
          return { images: [...state.images, ...r.hits] };
        });
      })
      .catch(console.log)
      .then(this.setState({ loading: false }));
  };

  render() {
    const { images, loading, showLoadMore } = this.state;
    return (
      <>
        {images && (
          <ul className={s.gallery}>
            <ImageGalleryItem images={images} />
          </ul>
        )}

        {loading && <Loader />}

        {showLoadMore && <Button onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
