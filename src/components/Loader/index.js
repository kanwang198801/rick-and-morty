import * as React from 'react';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <IconContext.Provider value={{ className: styles.loader }}>
      <FaSpinner />
    </IconContext.Provider>
  );
};

export default Loader;
