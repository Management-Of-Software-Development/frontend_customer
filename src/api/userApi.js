import { api } from ".";
const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserInfo: build.query({
			query: () => ({
				url: "/user",
				method: "GET",
			}),
		}),
		updateUserInfo: build.mutation({
			query: (data) => ({
				url: "/user/change/profile",
				method: "PUT",
				body: data,
			}),
		}),
		changePassword: build.mutation({
			query: (data) => ({
				url: "/user/change/password",
				method: "PATCH",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetUserInfoQuery,
	useUpdateUserInfoMutation,
	useChangePasswordMutation,
} = userApi;
