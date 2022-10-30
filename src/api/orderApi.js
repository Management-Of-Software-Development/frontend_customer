import { api } from "./";

const orderApi = api.injectEndpoints({
	endpoints: (build) => ({
		createOrder: build.mutation({
			query: ({
				customer_email,
				shipping_address: {
					receiver_name,
					receiver_phone_number,
					city,
					district,
					ward,
					address,
				},
				payment_method,
				products,
				discount_code,
				total_product_cost,
			}) => ({
				url: `/orders`,
				method: "POST",
				body: {
					customer_email,
					shipping_address: {
						receiver_name,
						receiver_phone_number,
						city,
						district,
						ward,
						address,
					},
					payment_method,
					products,
					discount_code,
					total_product_cost,
				},
			}),
			invalidatesTags: ["order"],
		}),
		getOrders: build.query({
			query: (params) => ({
				url: "/orders",
				params,
				method: "GET",
			}),
		}),
		getOrder: build.query({
			query: ({ order_id }) => ({
				url: `/orders/${order_id}`,
				method: "GET",
			}),
		}),
		createLoyalOrder: build.mutation({
			query: ({
				customer_email,
				discount_code,
				gifts,
				shipping_address: {
					receiver_name,
					receiver_phone_number,
					city,
					district,
					ward,
					address,
				},
				payment_method,
				products,
				total_product_cost,
			}) => ({
				url: `/orders/loyalCustomer`,
				method: "POST",
				body: {
					customer_email,
					gifts: gifts.length > 0 ? gifts : undefined,
					shipping_address: {
						receiver_name,
						receiver_phone_number,
						city,
						district,
						ward,
						address,
					},
					payment_method,
					discount_code,
					products,
					total_product_cost,
				},
			}),
			invalidatesTags: ["order"],
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrdersQuery,
	useGetOrderQuery,
	useCreateLoyalOrderMutation,
} = orderApi;
