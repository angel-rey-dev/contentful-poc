import { gql } from "graphql-request";

export const GET_PAGE_COLLECTION_QUERY = gql`
  query ($preview: Boolean = false) {
    __typename
    pageCollection(preview: $preview) {
      __typename
      total
      items {
        __typename
        sys {
          id
        }
        internalName
        pageName
        slug
        image {
          title
          description
          fileName
          url
        }
      }
    }
  }
`;
