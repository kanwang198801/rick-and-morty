import * as React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const Search = ({ onSearchAllChange, placeholder }) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        placeholder={placeholder}
        type="search"
        onChange={onSearchAllChange}
      />
    </div>
  );
};
export default Search;

Search.propTypes = {
  onSearchAllChange: PropTypes.func,
  placeholder: PropTypes.string,
};
