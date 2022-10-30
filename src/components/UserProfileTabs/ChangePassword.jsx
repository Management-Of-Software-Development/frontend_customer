import React, { useState } from "react";
import styled from "styled-components";
import { Input, notification } from "antd";
import { Link } from "react-router-dom";
import { Lock } from "@material-ui/icons";
import { useChangePasswordMutation } from "../../api/userApi";

const Container = styled.div``;

const Inner = styled.div`
	& > :not(:last-child) {
		margin-bottom: 20px;
	}
`;

const Title = styled.div`
	text-transform: uppercase;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 1px;
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

const ChangePassword = () => {
	const [values, setValues] = useState({
		old_password: "",
		new_password: "",
	});

	const [changePassword] = useChangePasswordMutation();

	const onSubmit = (e) => {
		e.preventDefault();

		changePassword({
			old_password: values.old_password,
			new_password: values.new_password,
		});

		notification.open({
			message: "CANDLE IN THE WIND REMINDS YOU...",
			description: "Password Updated!",
			onClick: () => {
				console.log("Notification Clicked!");
			},
			placement: "bottomRight",
			duration: 3,
		});
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<Inner>
					<Title>Password</Title>
					<Input.Password
						size="large"
						placeholder="Current Password"
						prefix={<Lock />}
						onChange={(e) =>
							setValues({
								...values,
								old_password: e.currentTarget.value,
							})
						}
					/>
					<Input.Password
						size="large"
						placeholder="New Password"
						prefix={<Lock />}
						onChange={(e) =>
							setValues({
								...values,
								new_password: e.currentTarget.value,
							})
						}
					/>
					<Button type="submit">SUBMIT</Button>
					<Link to="/profile">
						<ButtonCancel type="reset">CANCEL</ButtonCancel>
					</Link>
				</Inner>
			</form>
		</Container>
	);
};

export default ChangePassword;
