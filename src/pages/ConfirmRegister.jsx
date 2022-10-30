import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../services/user.service";
export default function ConfirmRegister() {
	const { token } = useParams();
	const navigator = useNavigate();
	useEffect(() => {
		if (token) UserService.confirmRegister({ token }, navigator);
	});
	return <div>Confirm Register Email!</div>;
}
