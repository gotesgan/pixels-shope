// utils/graphqlRequest.js
export async function fetchGraphQL(host, query, variables = {}) {
  // Add protocol if missing
  const baseURL = host.startsWith('http') ? host : `http://${host}:3001`;

  const response = await fetch(`${baseURL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization here if needed
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  console.log('GraphQL response:', result);
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error('Failed to fetch GraphQL data');
  }

  return result.data;
}
