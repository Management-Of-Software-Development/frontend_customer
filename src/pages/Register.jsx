import React from "react";
import styled from "styled-components";
import { Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row-reverse;
`;

const Inner = styled.div`
	width: 85%;
	margin: 100px 50px 50px;
`;

const InnerRight = styled.div`
	& > :not(:last-child) {
		margin-bottom: 20px;
	}
`;

const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 24px;
	line-height: 24px;
	letter-spacing: 5px;
	font-weight: 700;
	margin-bottom: 20px;
`;

const Content = styled.div`
	font-size: 16px;
	line-height: 22px;
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

	@media (max-width: 456px){
		width: 100%
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
	@media (max-width: 456px){
		width: 100%;
		margin: 0;
	}
`;

const Register = () => {
	const navigator = useNavigate();
	const [values, setValues] = useState({
		fullname: "",
		email: "",
		phone: "",
		password: "",
	});
	const onSubmit = (e) => {
		e.preventDefault();
		UserService.register(values, navigator);
	};
	return (
		<Container>
			<Inner>
				<form onSubmit={onSubmit}>
					<Row gutter={[20,40]}>
						<Col xs={24} sm={24} md={10}>
							<LeftContainer>
								<Title>SIGN UP TO CANDLES</Title>
								<Content>
									Already a Candle In The Wind member?
									<Link to={"/login"}>
										{` `}
										<span style={{ color: "#0043e9" }}>
											LOGIN
										</span>
									</Link>
								</Content>
							</LeftContainer>
						</Col>
						<Col xs={24} sm={24} md={{span: 13, offset: 1}} lg={{span: 12, offset: 2}} xl={{span: 11, offset: 3}}>
							<InnerRight>
								<Input
									size="large"
									placeholder="Full Name"
									onChange={(e) => {
										setValues({
											...values,
											fullname: e.currentTarget.value,
										});
									}}
									type="text"
									style={{fontSize: 16}}
								/>
								<Input
									size="large"
									placeholder="Email"
									onChange={(e) => {
										setValues({
											...values,
											email: e.currentTarget.value,
										});
									}}
									type="email"
									style={{fontSize: 16}}
								/>
								<Input
									size="large"
									placeholder="Password"
									onChange={(e) => {
										setValues({
											...values,
											password: e.currentTarget.value,
										});
									}}
									type="password"
									style={{fontSize: 16}}
								/>
								{/*<Input
									size="large"
									placeholder="Confirm Password"
									onChange={(e) => {
										setValues({...values, confirmPassword: e.currentTarget.value});
									}}
									//type="password"
									style={{fontSize: 16}}
								/>*/}
								<Input
									size="large"
									placeholder="Phone Number"
									onChange={(e) => {
										setValues({
											...values,
											phone: e.currentTarget.value,
										});
									}}
									type="tel"
								/>
								<Button type="submit">SUBMIT</Button>
								<Link to="/">
									<ButtonCancel>CANCEL</ButtonCancel>
								</Link>
							</InnerRight>
						</Col>
					</Row>
				</form>
			</Inner>
		</Container>
	);
};

export default Register;
