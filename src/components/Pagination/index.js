import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '../Divider';

export default function Pagination({
  paginationNums,
  currentPage,
  filterValues,
}) {
  let pagination = [];
  const {
    searchAllInput,
    statusFilter,
    speciesFilter,
    typeFilter,
    genderFilter,
  } = filterValues;

  let name = 'All',
    status = 'All',
    species = 'All',
    type = 'All',
    gender = 'All',
    filterParam = 'All';
  if (searchAllInput) {
    name = searchAllInput;
  }
  if (statusFilter) {
    status = statusFilter;
  }
  if (speciesFilter) {
    species = speciesFilter;
  }
  if (typeFilter) {
    type = typeFilter;
  }
  if (genderFilter) {
    gender = genderFilter;
  }

  if (
    searchAllInput ||
    statusFilter ||
    speciesFilter ||
    typeFilter ||
    genderFilter
  ) {
    filterParam = `${name}-${status}-${species}-${type}-${gender}`;
  }

  if (paginationNums.length > 0) {
    pagination = paginationNums.map((paginationNum) => {
      return (
        <div className={styles.paginationNum} key={`item - ${paginationNum}`}>
          <Link
            className="link"
            to={{
              pathname: `/page/${filterParam}/${paginationNum}`,
            }}
          >
            {paginationNum === currentPage ? (
              <p>
                <strong>{paginationNum}</strong>
              </p>
            ) : (
              <p>{paginationNum}</p>
            )}
          </Link>
        </div>
      );
    });
  }
  return (
    <>
      {pagination.length > 0 && (
        <div className={styles.pagination}>
          <Divider />
          {pagination}
        </div>
      )}
    </>
  );
}

Pagination.propTypes = {
  paginationNums: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPage: PropTypes.number.isRequired,
  filterValues: PropTypes.objectOf(PropTypes.string).isRequired,
};
