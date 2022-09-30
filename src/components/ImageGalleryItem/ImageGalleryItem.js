import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  };

  state = { modalOptions: { show: false, src: '', alt: '' } };

  showModal = e => {
    this.setState({
      modalOptions: {
        show: true,
        src: e.target.dataset.src,
        alt: e.target.alt,
      },
    });
  };

  closeModal = () => {
    this.setState({ modalOptions: { show: false, src: '', alt: '' } });
  };

  render() {
    const {
      modalOptions: { show, src, alt },
    } = this.state;
    const { images } = this.props;

    return (
      <>
        {images.map(el => (
          <li className={s.galleryItem} key={el.id}>
            <img
              onClick={this.showModal}
              className={s.galleryItemImg}
              src={el.webformatURL}
              alt={el.tags}
              data-src={el.largeImageURL}
            />
          </li>
        ))}
        {show && <Modal src={src} alt={alt} closeModal={this.closeModal} />}
      </>
    );
  }
}
