import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

const GET_CHARACTER = gql`
query getCharacter($id: ID!) { 
  character(id: $id) {
        id
        name
        status
        species
        type
        gender
        image
        episode{
            id
            name
            air_date
            episode
            created
        }
        created
      }
  }
`

export default function Character(props) {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error:{error}</p>;
  console.info(data);
  return <h1>Character: {data.character.name}</h1>;
}
