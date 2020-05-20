import * as React from 'react';
import styles from './styles.module.css';

export default function Search({ searchChange }) {
    return (
        <div className={styles.search}>
            <input
                type='search'
                placeholder='search by name'
                onChange={searchChange}
            />
        </div>
    );
}
