import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import List from '../components/List';
import Theme from '../components/Theme';
import Loader from '../components/Loader';
import Divider from '../components/Divider';
import { GET_CHARACTER } from '../grahpql/characters';

const Character = (props) => {
  const id = props.match.params.id;
  let content;

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
        <img src={character.image} alt="character" />
        <h1>{character.name}</h1>
        <h5>Status: {character.status}</h5>
        <h5>Species: {character.species}</h5>
        {character.type && <h5>Type: {character.type}</h5>}
        <h5>Gender: {character.gender}</h5>
        <Divider />
        <h3>Episodes </h3>
        <List items={character.episode} type="episode" />
      </>
    );
  }

  return <Theme>{content}</Theme>;
};

export default Character;

Character.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
