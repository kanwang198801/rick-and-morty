import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import List from '../components/List';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Theme from '../components/Theme';
import Loader from '../components/Loader';
import Divider from '../components/Divider';
import { GET_CHARACTERS } from '../grahpql/characters';

const Characters = (props) => {
  let page = 1,
    filteredCharacters,
    paginationNums = [],
    content = '',
    propsFilter = ['', '', '', '', ''];

  if (props.match.params.filter) {
    propsFilter = props.match.params.filter.replace(/All/g, '').split('-');
  }

  const [searchInput, setSearchInput] = useState('');
  const [searchAllInput, setSearchAllInput] = useState(propsFilter[0]);
  const [searchAllInputTimeout, setSearchAllInputTimeout] = useState(0);
  const [statusFilter, setStatusFilter] = useState(propsFilter[1]);
  const [speciesFilter, setSpeciesFilter] = useState(propsFilter[2]);
  const [typeFilter, setTypeFilter] = useState(propsFilter[3]);
  const [genderFilter, setGenderFilter] = useState(propsFilter[4]);
  const filterFunctions = {
    setStatusFilter,
    setSpeciesFilter,
    setTypeFilter,
    setGenderFilter,
  };
  const filterValues = {
    searchAllInput,
    statusFilter,
    speciesFilter,
    typeFilter,
    genderFilter,
  };

  if (props.match.params.id) {
    page = parseInt(props.match.params.id);
  }

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      name: searchAllInput,
      status: statusFilter,
      species: speciesFilter,
      type: typeFilter,
      gender: genderFilter,
    },
  });

  //   const onSearchChange = (event) => {
  //     setSearchInput(event.target.value);
  //   };
  const onSearchAllChange = (event) => {
    const { value } = event.target;
    if (searchAllInputTimeout) {
      clearTimeout(searchAllInputTimeout);
    }
    setSearchAllInputTimeout(
      setTimeout(() => {
        setSearchAllInput(value);
      }, 1500)
    );
  };

  if (loading) content = <Loader />;
  else if (error) content = <p>Opps... try it again</p>;
  else {
    if (searchInput) {
      filteredCharacters = data.characters.results.filter((character) => {
        return character.name.toLowerCase().includes(searchInput.toLowerCase());
      });
    } else {
      filteredCharacters = data.characters.results;
    }

    for (let i = 1; i < Math.ceil(data.characters.info.count / 20); i++) {
      paginationNums.push(i);
    }
    content = (
      <>
        <Divider />
        <List items={filteredCharacters} link="character" type="character" />
        <Pagination
          paginationNums={paginationNums}
          currentPage={page}
          filterValues={filterValues}
        />
      </>
    );
  }

  return (
    <Theme>
      <h1>Characters: Page {page}</h1>
      {!props.match.params.id && (
        <>
          <Filter
            filterFunctions={filterFunctions}
            filterValues={filterValues}
          />
          <Search
            onSearchAllChange={onSearchAllChange}
            placeholder="Search All"
          />
        </>
      )}
      {/* <Search searchChange={onSearchChange} placeholder="Search" /> */}
      {content}
    </Theme>
  );
};

export default Characters;

Characters.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      filter: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
