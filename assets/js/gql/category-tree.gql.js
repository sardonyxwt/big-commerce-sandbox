import {gql} from "graphql-request";
import {getClient} from "./client.gql";

const document = gql`query categoryTree {
    site {
        categoryTree {
            entityId
            name
            path
            productCount
            hasChildren
        }
    }
}`;

export const categoryTreeQuery = async (token) => {
    const client = getClient(token);
    const {site} = await client.request(document);
    return site.categoryTree;
}
