import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

import React from 'react';

function Loader(props) {
  return (
    <div className={s.loader}>
      <ThreeDots height="60" width="100" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
