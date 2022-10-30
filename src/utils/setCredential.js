import { Cookies } from "react-cookie";
import jwtDecode from "jwt-decode";
export default function setCredential(accessToken, refreshToken) {
	const Cookie = new Cookies();
	Cookie.set("accessToken", accessToken);
	Cookie.set("refreshToken", refreshToken);
	Cookie.set("user", jwtDecode(accessToken));
}
