import { gql } from 'apollo-boost';

export const GET_CHARACTERS = gql`
  query getCharacters(
    $page: Int!
    $name: String
    $status: String
    $species: String
    $type: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        type: $type
        gender: $gender
      }
    ) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        image
      }
    }
  }
`;

export const GET_CHARACTER = gql`
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
