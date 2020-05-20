import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'
import List from '../components/List';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const GET_CHARACTERS = gql`
    query getCharacters($page: Int!) { 
    characters(page: $page) {
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
  const [searchInput, setSearchInput] = useState('');
  let page = 1;

  if (props.match.params.id) {
    page = parseInt(props.match.params.id);
  }

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  let filteredCharacters;
  let paginationNums = [];

  const onSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;
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

  return (
    <>
      <h1>Characters: Page {page}</h1>
      <Search searchChange={onSearchChange} />
      <List items={filteredCharacters} link="character" type="character" />
      <Pagination paginationNums={paginationNums} currentPage={page} />
    </>
  );

}
