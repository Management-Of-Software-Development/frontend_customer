import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../services/user.service";
export default function ConfirmForgotPassword() {
	const { token } = useParams();
	const navigator = useNavigate();
	useEffect(() => {
		if (token) UserService.confirmForgotPassword({ token }, navigator);
	});
	return <div>Confirm Forgot Password!</div>;
}
