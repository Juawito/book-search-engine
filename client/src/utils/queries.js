const { gql } = require('@apollo/client');

export const QUERY_ME = gql`
    query me {
        # must match what is in the server side queries, this is just what the front will use, backend will be the logic
    }
`