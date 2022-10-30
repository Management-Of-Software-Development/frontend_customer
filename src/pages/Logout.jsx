import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

export default function Logout() {
	const navigator = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: "user/logout" });
		dispatch(setUser(null));
		UserService.logout(navigator);
	});
	return <div>Logout</div>;
}
