import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Pagination({ paginationNums, currentPage }) {
    let pagination = [];
    if (paginationNums.length > 0) {
        pagination = paginationNums.map((paginationNum) => {
            return (<div className={styles.paginationNum} key={`item - ${paginationNum}`}>
                <Link className="link" to={`/page/${paginationNum}`}>
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
            {pagination.length > 0 ? (
                <div className={styles.pagination}>
                    {pagination}
                </div>
            ) : <h3>Not found</h3>}
        </>
    );
}

Pagination.propTypes = {
    paginationNums: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentPage: PropTypes.number.isRequired,
};