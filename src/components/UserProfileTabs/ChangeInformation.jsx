import React, { useState } from "react";
import styled from "styled-components";
import { Input, notification } from "antd";
import { Link, Navigate } from "react-router-dom";
import {
	useGetUserInfoQuery,
	useUpdateUserInfoMutation,
} from "../../api/userApi";
import { useSearchParams } from "react-router-dom";
import { Email, Phone, Person } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	height: 500px;
`;

const Button = styled.button`
	padding: 13px 50px;
	font-size: 12px;
	margin-bottom: 50px;
	background-color: black;
	color: white;
	cursor: pointer;
	letter-spacing: 3px;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	font-weight: 700;

	&:hover {
		background: transparent;
		color: black;
		border-color: black;
	}
`;

const ButtonCancel = styled.button`
	padding: 13px 50px;
	margin-left: 5px;
	font-size: 12px;
	margin-bottom: 50px;
	background-color: white;
	color: black;
	cursor: pointer;
	letter-spacing: 3px;
	border: 1px solid black;
	transition: all 0.3s ease-in-out;
	font-weight: 700;

	&:hover {
		background: transparent;
		color: black;
		border-color: black;
	}
`;

const Inner = styled.div`
	& > :not(:last-child) {
		margin-bottom: 20px;
	}
	height: 500px;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 1px;
`;

const ChangeInformation = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: user } = useGetUserInfoQuery();
	const navigate = useNavigate();
	const [updateProfile] = useUpdateUserInfoMutation();

	const [inputName, setInputName] = useState(user?.fullname);

	const [inputPhone, setInputPhone] = useState(user?.phone);

	const [inputEmail, setInputEmail] = useState(user?.email);

	const [inputAddress, setInputAddress] = useState(user?.address);

	const handleNameChange = (e) => {
		setInputName(e.target.value);
	};

	const handlePhoneChange = (e) => {
		setInputPhone(e.target.value);
	};

	const handleEmailChange = (e) => {
		setInputEmail(e.target.value);
	};

	const handleAddressChange = (e) => {
		setInputAddress(e.target.value);
	};
	console.log(
		`${searchParams.get("avatarURL")}&token=${searchParams.get("token")}`
	);
	const onSubmit = (e) => {
		e.preventDefault();
		if (!localStorage.getItem("avatar")) {
			updateProfile({
				fullname: inputName,
				phone: inputPhone,
				email: inputEmail,
				address: inputAddress,
			});
		} else {
			console.log("run here");
			updateProfile({
				avatar: localStorage.getItem("avatar"),
				fullname: inputName,
				phone: inputPhone,
				email: inputEmail,
				address: inputAddress,
			});
		}

		notification.open({
			message: "CANDLE IN THE WIND REMINDS YOU...",
			description: "Information Updated!",
			onClick: () => {
				console.log("Notification Clicked!");
			},
			placement: "bottomRight",
			duration: 3,
		});
		navigate("/profile");
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<Inner>
					<Title>User Profile</Title>
					<Input
						size="large"
						defaultValue={user?.fullname}
						value={inputName}
						placeholder="Name"
						onChange={handleNameChange}
						type="text"
					/>
					<Input
						size="large"
						value={user?.phone}
						placeholder="Phone Number"
						onChange={handlePhoneChange}
						type="tel"
					/>
					<Input
						size="large"
						defaultValue={user?.email}
						value={inputEmail}
						placeholder="Email"
						onChange={handleEmailChange}
						type="email"
					/>
					<Input
						size="large"
						defaultValue={user?.address}
						value={inputAddress}
						placeholder="Address"
						onChange={handleAddressChange}
					/>
					<Button type="submit">SUBMIT</Button>
					<Link to="/profile">
						<ButtonCancel>CANCEL</ButtonCancel>
					</Link>
				</Inner>
			</form>
		</Container>
	);
};

export default ChangeInformation;
