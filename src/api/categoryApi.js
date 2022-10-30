import { api } from "./";


const categoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllCategories: build.query({
			query: () => ({
				method: "GET",
				url: "/category",
			}),
		}),
	}),
});

export const {
	useGetAllCategoriesQuery,
	useGetAllScentsCategoriesQuery,
} = categoryApi;

