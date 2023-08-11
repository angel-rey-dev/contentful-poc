import { GraphQLClient } from "graphql-request";

const contentful = Object.seal({
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  spacedId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  preview: {
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    secret: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET,
  },
});

export const getGraphQLRequestClient = (isPreviewActive = false) => {
  const ctfGraphQLUrl = `https://graphql.contentful.com/content/v1/spaces/${contentful.spacedId}/environments/${contentful.environment}`;
  const accessToken = isPreviewActive
    ? contentful.preview.accessToken
    : contentful.accessToken;
  const graphqlRequestClient = new GraphQLClient(ctfGraphQLUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return graphqlRequestClient;
};
