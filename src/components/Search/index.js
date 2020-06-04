import * as React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function Search({ onSearchAllChange, placeholder }) {
    return (
        <div className={styles.search}>
            <input
                className={styles.searchInput}
                placeholder={placeholder}
                type='search'
                onChange={onSearchAllChange}
            />
        </div>
    );
}

Search.propTypes = {
    onSearchAllChange: PropTypes.func,
    placeholder: PropTypes.string,
};