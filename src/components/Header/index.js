import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
