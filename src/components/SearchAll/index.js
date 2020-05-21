import * as React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function SearchAll({ onSearchAllChange }) {
    return (
        <div className={styles.search}>
            <input
                className={styles.searchInput}
                type='search'
                placeholder='search all by name'
                onChange={onSearchAllChange}
            />
        </div>
    );
}

SearchAll.propTypes = {
    onSearchAllChange: PropTypes.func,
};