import { Cookies } from "react-cookie";
const isUserLoggedin = () => {
	const Cookie = new Cookies();
	const user = Cookie.get("user");
	if (user) return true;
	return false;
};
export default isUserLoggedin;
