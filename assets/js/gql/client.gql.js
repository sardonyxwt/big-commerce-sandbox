import {GraphQLClient} from "graphql-request";

export const getClient = (token) => {
    const url = new URL(location.href);
    return new GraphQLClient(`${url.origin}/graphql`, {
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
