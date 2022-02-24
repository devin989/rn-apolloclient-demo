import {gql} from "@apollo/client";

export const CHARACTERS = gql`
    query {
  characters {
    results {
      id
      name
      status
      image
      gender
      species
    }
  }
}
`;
