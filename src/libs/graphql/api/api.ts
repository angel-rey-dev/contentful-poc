import {
  GET_PAGE_COLLECTION_QUERY,
  getGraphQLRequestClient,
} from "@/libs/graphql";

export const getPageCollection = async (preview = false) => {
  const graphqlRequestClient = getGraphQLRequestClient(preview);
  const data = await graphqlRequestClient.request(GET_PAGE_COLLECTION_QUERY, {
    preview,
  });
  return data;
};
