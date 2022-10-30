import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import UserService from "../services/user.service";
import isUserLoggedin from "../utils/isUserLoggedin";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { Row, Col } from 'antd'

const Container = styled.div`
	width: 100%;
	height: 500px;
	display: flex;
	align-items: center;
	justify-items: flex-start;
`;

const FormContainer = styled.form`
	width: 100%;
	margin: 0 50px;
	@media (max-width: 456px){
		margin: 0 20px;
	}
`;

const FormInner = styled.div`
	width: 100%;
	padding: 10px;
`;

const Title = styled.div`
	font-size: 24px;
	line-height: 24px;
	letter-spacing: 5px;
	font-weight: 700;
	margin-bottom: 20px;
`;

const Content = styled.div`
	width: 100%;
	margin-bottom: 20px;
	font-size: 16px;
`;

const Username = styled.div`
	width: 100%;
	margin-bottom: 20px;
`;

const Password = styled.div``;

const Button = styled.button`
	margin-top: 24px;
	padding: 13px 50px;
	font-size: 12px;
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

const Login = () => {
	const navigator = useNavigate();
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const onSubmit = (e) => {
		e.preventDefault();
		UserService.login(values, navigator)
			.then((res) => dispatch(setUser(res)))
			.catch((e) => console.log(e));
	};
	return (
		<>
			{isUserLoggedin() && <Navigate to="/" />}
			<Container>
				<FormContainer onSubmit={onSubmit}>
					<FormInner>
						<Row gutter={[40, 40]}>
							<Col xs={24} sm={24} md={{span: 9, offset: 1}}>
								<Title>INPUT YOUR CREDENTIALS</Title>
								<Content>
									Log in to your account and gain access to more
									streamlined online ordering, access your promo
									codes, earn more with your orders and track
									shipments.
								</Content>
							</Col>
							<Col xs={24} sm={24} md={{span: 12, offset: 1}} lg={{span: 11, offset: 2}} xl={{span: 10, offset: 3}}>
								<Username>
									<input
										placeholder="email"
										onChange={(e) =>
											setValues({
												...values,
												email: e.currentTarget.value,
											})
										}
										style={{padding: 5, width: '100%'}}
									/>
								</Username>
								<Password>
									<input
										type="password"
										placeholder="password"
										onChange={(e) =>
											setValues({
												...values,
												password: e.currentTarget.value,
											})
										}
										style={{padding: 5, width: '100%'}}
									/>
								</Password>
								<div
									style={{
										display: "flex",
										justifyContent: 'flex-end',
										alignItems: "center",
										gap: "12px",
										marginTop: "12px",
									}}
								>
									<Link to="/register">Register</Link>
									<Link to="/forgot-password">
										Forget Your Password?
									</Link>
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: 'flex-end',
									}}
								>
									<Button type="submit" onClick={() => {}}>
										LOGIN
									</Button>
								</div>
							</Col>
						</Row>
					</FormInner>
				</FormContainer>
			</Container>
		</>
	);
};

export default Login;