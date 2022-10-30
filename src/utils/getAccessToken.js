import { Cookies } from "react-cookie";

export const getAccessToken = () => {
	const Cookie = new Cookies();
	const accessToken = Cookie.get("accessToken");
	if (accessToken) return accessToken;
	return null;
};
