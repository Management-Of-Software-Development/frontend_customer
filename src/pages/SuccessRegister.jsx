import React from "react";
import styled from "styled-components";
import { CheckBox } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
	width: 320px;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-size: 28px;
	font-weight: 600;
	letter-spacing: 2px;
	text-align: center;
`;

const CheckBoxContainer = styled.div`
	font-size: 72px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0 30px;
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

const SuccessRegister = () => {
	return (
		<Container>
			<Inner>
				<Title>Successful!</Title>
				<div style={{ textAlign: "center" }}>
					Check your email and following the instruction to complete
					the registration.
				</div>
				<CheckBoxContainer>
					<CheckBox fontSize="inherit" />
				</CheckBoxContainer>
				<Link to={"/login"}>
					<Button>LOGIN</Button>
				</Link>
			</Inner>
		</Container>
	);
};

export default SuccessRegister;
