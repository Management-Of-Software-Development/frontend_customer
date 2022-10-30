import { api } from "./";

const productApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllAppreciationProducts: build.query({
			query: (params) => ({
				url: `/appreciationProduct`,
				method: "GET",
				params,
			}),
		}),
		getAppreciationProductById: build.query({
			query: ({ id }) => ({
				url: `/appreciationProduct/${id}`,
				method: "GET",
			}),
		}),
	}),
});


export const {
	useGetAllAppreciationProductsQuery,
	useGetAppreciationProductByIdQuery,
} = productApi;
