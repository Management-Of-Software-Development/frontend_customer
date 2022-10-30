import { Cookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import fetchWrapper from "../utils/fetchWrapper";
import setCredential from "../utils/setCredential";

const Cookie = new Cookies();

const login = ({ email, password }, navigator) => {
	return fetchWrapper
		.post("/auth/login", {
			email,
			password,
		})
		.then((res) => {
			const { accessToken, refreshToken } = res;
			setCredential(accessToken, refreshToken);
			if (navigator) navigator("/", { replace: true });
			return jwtDecode(accessToken);
		})
};

const register = async ({ email, password, phone, fullname }, navigator) => {
	try {
		return await fetchWrapper
			.post("/user", {
				email,
				password,
				phone,
				fullname,
			})
			.then(() => navigator("/register-successfully"));
	} catch (error) {
		console.log(error);
	}
};

const forgotPassword = async ({ email }, navigator) => {
	try {
		return await fetchWrapper
			.post(`/user/forgot-password`, { email })
			.then(() => navigator("/request-password-successfully"));
	} catch (e) {
		console.log(e);
	}
};

const confirmRegister = async ({ token }, navigator) => {
	try {
		return await fetchWrapper
			.get(`/user/register/verify/${token}`)
			.then(() => navigator("/confirm-email-successfully"));
	} catch (e) {
		console.log(e);
	}
};

const confirmForgotPassword = ({ token }, navigator) => {
	return fetchWrapper
		.get(`/user/forgot-password/verify/${token}`)
		.then(() => navigator(`/reset-password/${token}`))
		.catch((e) => {
			console.log(e);
		});
};

const logout = (navigator) => {
	try {
		Cookie.remove("accessToken");
		Cookie.remove("refreshToken");
		Cookie.remove("user");
		if (navigator) navigator("/login", { replace: true });
	} catch (e) {
		console.log(e);
	}
};

const resetPassword = (
	{ new_password, confirm_new_password, active_token },
	navigator
) => {
	return fetchWrapper
		.post(`/user/forgot-password/updatePassword`, {
			active_token,
			new_password,
			confirm_new_password,
		})
		.then(() => navigator("/reset-password-successfully"))
		.catch((e) => console.log(e));
};

const UserService = {
	login,
	register,
	logout,
	confirmRegister,
	forgotPassword,
	resetPassword,
	confirmForgotPassword,
};

export default UserService;
