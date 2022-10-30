import { api } from "./";

const productApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllProducts: build.query({
			query: (params) => ({
				url: `/product`,
				method: "GET",
				params,
			}),
		}),
		getProductById: build.query({
			query: ({ id }) => ({
				url: `/product/${id}`,
				method: "GET",
			}),
		}),
	}),
});


export const {
	useGetAllProductsQuery,
	useGetProductByIdQuery,
} = productApi;
