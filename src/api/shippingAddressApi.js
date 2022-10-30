import { api } from ".";

const shippingAddressApi = api.injectEndpoints({
	endpoints: (build) => ({
		getShippingAddress: build.query({
			query: (params) => ({
				url: "/shipping_address",
				method: "GET",
				params,
			}),
			providesTags: () => [{ type: "address", id: "LIST" }],
		}),
		getShippingAddressDetail: build.query({
			query: ({ id }) => ({
				url: `/shipping_address/${id}`,
				method: "GET",
			}),
		}),
		updateShippingAddress: build.mutation({
			query: ({
				id,
				receiver_name,
				receiver_phone_number,
				city,
				district,
				ward,
				address,
			}) => ({
				url: `/shipping_address/${id}`,
				method: "PUT",
				body: {
					address_detail: {
						address,
						receiver_name,
						receiver_phone_number,
						city,
						district,
						ward,
					},
				},
			}),
			invalidatesTags: () => [{ type: "address", id: "LIST" }],
		}),
		deleteShippingAddress: build.mutation({
			query: ({ id }) => ({
				url: `/shipping_address/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: () => [{ type: "address", id: "LIST" }],
		}),
		createShippingAddress: build.mutation({
			query: ({
				receiver_name,
				receiver_phone_number,
				city,
				district,
				ward,
				address,
			}) => ({
				url: "/shipping_address",
				method: "POST",
				body: {
					address_detail: {
						address,
						receiver_name,
						receiver_phone_number,
						city,
						district,
						ward,
					},
				},
			}),
			invalidatesTags: () => [{ type: "address", id: "LIST" }],
		}),
	}),
});

export const {
	useGetShippingAddressQuery,
	useGetShippingAddressDetailQuery,
	useUpdateShippingAddressMutation,
	useCreateShippingAddressMutation,
	useDeleteShippingAddressMutation,
} = shippingAddressApi;
