import * as React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import Header from '../Header';

export default function Theme({ children }) {
   return (
      <div className={styles.content}>
         <Header />
         <div className={styles.container}>{children}</div>
      </div>
   );
}

Theme.propTypes = {
   children: PropTypes.node,
};
