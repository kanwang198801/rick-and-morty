import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

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

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;
  console.info(data.characters.results);
  return <h1>Characters count: {data.characters.info.count}</h1>;
}
