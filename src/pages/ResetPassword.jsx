import React, { useState } from "react";
import styled from "styled-components";
import { VpnKey, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Input, Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000;
`;

const Inner = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 350px;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-size: 28px;
	font-weight: 600;
	letter-spacing: 2px;
	text-align: center;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px 0 20px;
`;

const CheckBoxContainer = styled.div`
	font-size: 72px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0 10px;
`;

const SubmitButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	padding: 13px 50px;
	font-size: 12px;
	margin-bottom: 60px;
	background-color: rgb(0, 0, 0);
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

const ResetPassword = () => {
	const navigator = useNavigate();
	const { token } = useParams();
	const [values, setValues] = useState({
		new_password: "",
		confirm_new_password: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();
		UserService.resetPassword(
			{
				new_password: values.new_password,
				confirm_new_password: values.confirm_new_password,
				active_token: String(token),
			},
			navigator
		);
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<Inner>
					<Row>
						<Col span={24}>
							<CheckBoxContainer>
								<VpnKey fontSize="inherit" />
							</CheckBoxContainer>
							<Title>New Credentials</Title>
							<Content>
								<div>Your identity has been verified!</div>
								<div>Set your new password</div>
							</Content>
							<Input.Password
								style={{ marginBottom: "10px" }}
								size="large"
								onChange={(e) => {
									setValues({
										...values,
										new_password: e.currentTarget.value,
									});
								}}
								prefix={<Lock />}
								placeholder="New Password"
							/>
							<Input.Password
								style={{ marginBottom: "30px" }}
								size="large"
								onChange={(e) => {
									setValues({
										...values,
										confirm_new_password:
											e.currentTarget.value,
									});
								}}
								prefix={<Lock />}
								placeholder="Confirm Password"
							/>
							<SubmitButton>
								<Button type="submit">SUBMIT</Button>
							</SubmitButton>
						</Col>
					</Row>
				</Inner>
			</form>
		</Container>
	);
};

export default ResetPassword;
