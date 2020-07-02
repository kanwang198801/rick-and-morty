import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}
