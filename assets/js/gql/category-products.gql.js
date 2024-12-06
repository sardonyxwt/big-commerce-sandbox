import {gql} from "graphql-request";
import {getClient} from "./client.gql";

const document = gql`query searchProductsByCategoryId($categoryEntityId: Int!, $count: Int = 3) {
    site {
        search {
            searchProducts(filters: {
                categoryEntityId: $categoryEntityId
            }) {
                products(first: $count) {
                    edges {
                        node {
                            addToCartUrl
                            description
                            name
                            path
                            defaultImage {
                                altText
                                urlOriginal(lossy: true)
                            }
                            id
                            minPurchaseQuantity
                            maxPurchaseQuantity
                            prices {
                                price {
                                    currencyCode
                                    value
                                }
                            }
                            weight {
                                unit
                                value
                            }
                            width {
                                unit
                                value
                            }
                            height {
                                unit
                                value
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export const searchProductsByCategoryIdQuery = async (token, {categoryEntityId, count}) => {
    const client = getClient(token);
    const {site} = await client.request(document, {categoryEntityId, count});
    return site.search.searchProducts.products.edges.map(({node}) => node);
}
