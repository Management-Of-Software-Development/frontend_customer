import { api } from ".";
const discountCodeApi = api.injectEndpoints({
	endpoints: (build) => ({
		getDiscounts: build.query({
			query: () => ({
				url: "/discount_code",
				method: "GET",
				params: { page: 1, limit: 100 },
			}),
		}),
		getApplyingDiscountAmount: build.query({
			query: ({ discount_code, total_product_cost }) => ({
				url: `/discount_code/tryApplying/${discount_code}`,
				method: "GET",
				params: { total_product_cost },
			}),
		}),
	}),
});

export const { useGetDiscountsQuery, useGetApplyingDiscountAmountQuery } = discountCodeApi;
