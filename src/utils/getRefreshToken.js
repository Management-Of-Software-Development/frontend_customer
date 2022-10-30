import { Cookies } from "react-cookie";

export const getRefreshToken = () => {
	const Cookie = new Cookies();
	const refreshToken = Cookie.get("refreshToken");
	if (refreshToken) return refreshToken;
	return null;
};
