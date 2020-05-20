import * as React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function Search({ filterFunctions, filterValues }) {
    const {
        setStatusFilter,
        setSpeciesFilter,
        setTypeFilter,
        setGenderFilter
    } = filterFunctions;
    const {
        statusFilter,
        speciesFilter,
        typeFilter,
        genderFilter
    } = filterValues;
    return (
        <div className={styles.filter}>
            <select name="status" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} >
                <option value="">Select Status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <select name="species" onChange={(e) => setSpeciesFilter(e.target.value)} value={speciesFilter}>
                <option value="">Select Species</option>
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
            </select>
            <select name="type" onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
                <option value="">Select Type</option>
            </select>
            <select name="gender" onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
        </div>

    );
}

Search.propTypes = {
    filterFunctions: PropTypes.objectOf(PropTypes.func),
    filterValues: PropTypes.objectOf(PropTypes.string),
};