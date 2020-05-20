import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Pagination({ paginationNums, currentPage, filterValues }) {
    let pagination = [];
    const {
        statusFilter,
        speciesFilter,
        typeFilter,
        genderFilter
    } = filterValues;

    let status = "All", species = "All", type = "All", gender = "All", filterParam = "All";

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
    if (statusFilter || speciesFilter || typeFilter || genderFilter) {
        filterParam = `${status}-${species}-${type}-${gender}`;
    }

    console.info(filterParam);
    if (paginationNums.length > 0) {
        pagination = paginationNums.map((paginationNum) => {
            return (<div className={styles.paginationNum} key={`item - ${paginationNum}`}>
                <Link className="link" to={{
                    pathname: `/page/${paginationNum}/${filterParam}`
                }} >
                    {paginationNum === currentPage ?
                        (<p><strong>{paginationNum}</strong></p>)
                        :
                        (<p>{paginationNum}</p>)
                    }
                </Link >
            </div>
            );
        })
    }
    return (
        <>
            {pagination.length > 0 && (
                <div className={styles.pagination}>
                    {pagination}
                </div>
            )}
        </>
    );
}

Pagination.propTypes = {
    paginationNums: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentPage: PropTypes.number.isRequired,
};