import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'
import List from '../components/List';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';

const GET_CHARACTERS = gql`

    query getCharacters($page: Int!, $name: String, $status: String, $species: String, $type: String, $gender: String) { 
    characters(page: $page, filter: { name: $name, status: $status, species: $species, type: $type, gender: $gender }) {
        info {
          count
        }
        results{
            id
            name
            status
            species
            type
            image
        }
    }
  }
`

export default function Characters(props) {
  let page = 1,
    filteredCharacters,
    paginationNums = [],
    content = "",
    propsFilter = ["", "", "", ""];

  if (props.match.params.filter) {
    propsFilter = props.match.params.filter.replace(/All/g, "").split("-");
  }
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState(propsFilter[0]);
  const [speciesFilter, setSpeciesFilter] = useState(propsFilter[1]);
  const [typeFilter, setTypeFilter] = useState(propsFilter[2]);
  const [genderFilter, setGenderFilter] = useState(propsFilter[3]);
  const filterFunctions = { setStatusFilter, setSpeciesFilter, setTypeFilter, setGenderFilter };
  const filterValues = { statusFilter, speciesFilter, typeFilter, genderFilter };

  if (props.match.params.id) {
    page = parseInt(props.match.params.id);
  }

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, status: statusFilter, species: speciesFilter, type: typeFilter, gender: genderFilter },
  });

  const onSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  if (error) return <p>Error: {error}</p>;

  if (loading) {
    content = <p>loading ...</p>
  }
  else {
    if (searchInput) {
      filteredCharacters = data.characters.results.filter(character => {
        return character.name.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    else {
      filteredCharacters = data.characters.results;
    }

    for (let i = 1; i < Math.ceil(data.characters.info.count / 20); i++) {
      paginationNums.push(i);
    }
    content = <> <List items={filteredCharacters} link="character" type="character" />
      <Pagination paginationNums={paginationNums} currentPage={page} filterValues={filterValues} />
    </>
  }

  return (
    <>
      <h1>Characters: Page {page}</h1>
      {!props.match.params.id ?
        <Filter filterFunctions={filterFunctions} filterValues={filterValues} />
        : <button onClick={() => props.history.push("/")}>Back Home</button>
      }
      <Search searchChange={onSearchChange} />
      {content}
    </>
  );

}
