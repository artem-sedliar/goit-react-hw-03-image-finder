import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <button className={s.button} onClick={onClick}>
      Load More
    </button>
  );
}

Button.propTypes = { onClick: PropTypes.func.isRequired };

export default Button;
