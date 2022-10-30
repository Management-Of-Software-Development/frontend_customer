import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { getAccessToken } from "../utils/getAccessToken";
import { getRefreshToken } from "../utils/getRefreshToken";
import setCredential from "../utils/setCredential";
import isUserLoggedin from "../utils/isUserLoggedin";

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_API_URL,
	prepareHeaders: (headers) => {
		const accessToken = getAccessToken();
		if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401 && isUserLoggedin()) {
		// checking whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: "/auth/refresh",
						method: "POST",
						headers: {
							Authorization: `Bearer ${getAccessToken()}`,
						},
						body: {
							accessToken: getAccessToken(),
							refreshToken: getRefreshToken(),
						},
					},
					api,
					extraOptions
				);
				if (refreshResult) {
					const { accessToken, refreshToken } = refreshResult;
					setCredential(accessToken, refreshToken);
					// retry the initial query
					result = await baseQuery(args, api, extraOptions);
				} else {
					window.history.replaceState(null, "", "/logout");
				}
			} finally {
				// release must be called once the mutex should be released again.
				release();
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["order", "address"],
	endpoints: () => ({}),
});
