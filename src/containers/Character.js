import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import List from '../components/List';
import Theme from '../components/Theme';
import Loader from '../components/Loader';
import Divider from '../components/Divider';

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
         episode {
            id
            name
            air_date
            episode
         }
      }
   }
`;

export default function Character(props) {
   const id = props.match.params.id;
   let content = '';

   const { loading, error, data } = useQuery(GET_CHARACTER, {
      variables: { id },
   });

   if (loading) content = <Loader />;
   else if (error) content = <p>Opps... try it again</p>;
   else {
      const character = data.character;
      content = (
         <>
            <button onClick={() => props.history.goBack()}>Back</button>
            <img src={character.image} alt='character' />
            <h1>{character.name}</h1>
            <h5>Status: {character.status}</h5>
            <h5>Species: {character.species}</h5>
            {character.type && <h5>Type: {character.type}</h5>}
            <h5>Gender: {character.gender}</h5>
            <Divider />
            <h3>Episodes </h3>
            <List items={character.episode} type='episode' />
         </>
      );
   }

   return <Theme>{content}</Theme>;
}
