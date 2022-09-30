import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    keyword: '',
  };

  onChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const normalizeKeyword = this.state.keyword.toLowerCase().trim();

    if (normalizeKeyword === '') {
      return toast.info('Enter a word to search!');
    }

    this.props.onSubmit(normalizeKeyword);
    this.setState({ keyword: '' });
  };

  render() {
    const { keyword } = this.state;

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.onChange}
            value={keyword}
            name="keyword"
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
