import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'
import List from '../components/List';
import Search from '../components/Search';

const GET_CHARACTERS = gql`
  {
    characters {
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

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [searchInput, setSearchInput] = useState('');
  let filteredCharacters

  const onSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (searchInput) {
    console.info(filteredCharacters);
    filteredCharacters = data.characters.results.filter(character => {
      return character.name.toLowerCase().includes(searchInput.toLowerCase());
    });
  }
  else {
    filteredCharacters = data.characters.results;
  }

  return (
    <>
      <h1>Characters List: {data.characters.info.count} items</h1>
      <Search searchChange={onSearchChange} />
      <List items={filteredCharacters} link="character" />
    </>
  );

}
