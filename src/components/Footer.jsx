import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd"

const Container = styled.div`
	background: black;
	color: white;
	box-sizing: border-box;
`;
const LogoWrapper = styled.div`
	height: 155px;
	border-bottom: 0.5px solid grey;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const TopWrapper = styled.div`
	${'' /* height: 330px; */}
	text-align: center;
`;
const TopInner = styled.div`
	padding: 93px 30px 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;
const TopContent = styled.div`
	padding: 0 25px;
	margin: 0 0 50px;
	text-align: left;
	width: 200px;
`;
const TopContentTitle = styled.h5`
	font: 16px "Work sans", sans-serif;
	margin: 0px 0px 15px;
	color: #fff;
	font-weight: 600;
	letter-spacing: 4px;
	text-transform: uppercase;
`;
const TopContentLink = styled.div`
	font: 14px "Work sans", sans-serif;
	color: #b0b0b0;
	margin: 0px 0px 10px;
	a {
		cursor: pointer;
		&:hover {
			color: #fff;
		}
	}
`;
const MidWrapper = styled.div`
	padding: 9px 0px 50px;
	text-align: center;
`;
const MidInner = styled.div`
	padding: 0px 15px;
	display: flex;
	flex-direction: column;
`;
const MidTitle = styled.h4`
	font: 22px "Work sans", sans-serif;
	font-weight: 700;
	letter-spacing: 5px;
	word-spacing: 4px;
	text-transform: uppercase;
	color: white;
	margin: 0px 0px 2px;
`;
const MidNewletter = styled.div`
	margin: 16px 0px 0px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const MidEmailInput = styled.form`
	margin: 0px 0px 21px;
	padding: 8px 1px;
	border-bottom: 1px solid white;
	width: 600px;
	display: flex;
	justify-content: space-between;
	input {
		padding: 8px 0px;
		width: 80%;
		color: #b0b0b0;
		font: 13px "Work sans", sans-serif;
		background: black;
		border: none;
		&:focus {
			outline: none;
		}
	}
	button {
		border: none;
		background: black;
		color: #fff;
		font: 12px "Work sans", sans-serif;
		font-weight: 900px;
		letter-spacing: 2px;
		cursor: pointer;
		&:hover {
			color: #b0b0b0;
		}
	}
`;
const MidSocial = styled.div`
	width: 100%;
	font: 15px "Work sans", sans-serif;
	color: #ffffff;
	margin: 0 auto;
	${'' /* padding: 0px 450px; */}
	a {
		font: 12px "Work sans", sans-serif;
		font-weight: 700;
		letter-spacing: 2px;
		text-transform: uppercase;
		cursor: pointer;
		::after {
			content: "";
			width: 0;
			height: 1px;
			background: #ffffff;
			transition: width 0.3s;
		}
		&:hover::after {
			width: 98%;
		}
	}
`;
const BottomWrapper = styled.div`
	border-top: 1px solid #b0b0b0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 50px;
`;

const BottomCopyRight = styled.div`
	width: 300px;
	padding: 10px 0px;
	box-sizing: border-box;
`;

const Footer = () => {
	const [isValid, setIsValid] = useState(true);
	const [email, setEmail] = useState();

	const handleSend = (event) => {
		if (!email) setIsValid(!isValid);
		event.preventDefault();
	};
	return (
		<Container>
			<TopWrapper>
				<TopInner>
					<Row justify="space-evenly">
						<Col xs={24} sm={12} lg={6}>
							<TopContent>
								<TopContentTitle>CONTACT</TopContentTitle>
								<TopContentLink>
									<a>A: 1st Dai Co Viet, Hanoi, Vietnam</a>
								</TopContentLink>
								<TopContentLink>
									<a>T: 0982893001</a>
								</TopContentLink>
								<TopContentLink>
									<a>candleinthewind@gmail.com</a>
								</TopContentLink>
								<TopContentLink>
									<a>IG_candleinthewind</a>
								</TopContentLink>
							</TopContent>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<TopContent>
								<TopContentTitle>Services</TopContentTitle>
								<TopContentLink>
									<a>Exclusive offers</a>
								</TopContentLink>
								<TopContentLink>
									<a>Gifts</a>
								</TopContentLink>
								<TopContentLink>
									<a>Store location</a>
								</TopContentLink>
								<TopContentLink>
									<a>Corporate sales</a>
								</TopContentLink>
							</TopContent>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<TopContent>
								<TopContentTitle>Orders</TopContentTitle>
								<TopContentLink>
									<a>My account</a>
								</TopContentLink>
								<TopContentLink>
									<a>Delivery information</a>
								</TopContentLink>
								<TopContentLink>
									<a>Track my order</a>
								</TopContentLink>
								<TopContentLink>
									<a>Help</a>
								</TopContentLink>
							</TopContent>
						</Col>
						<Col xs={24} sm={12} lg={6}>
							<TopContent>
								<TopContentTitle>Popular</TopContentTitle>
								<TopContentLink>
									<a>Bergamot Collection</a>
								</TopContentLink>
								<TopContentLink>
									<a>Hulie divine</a>
								</TopContentLink>
								<TopContentLink>
									<a>La note de Paris</a>
								</TopContentLink>
								<TopContentLink>
									<a>Pachouli Home</a>
								</TopContentLink>
							</TopContent>
						</Col>
					</Row>
				</TopInner>
			</TopWrapper>

			<MidWrapper>
				<MidInner>
					<MidWrapper>
						<MidTitle> follow us & subcribe</MidTitle>
						<MidNewletter>
							<MidEmailInput>
								<input
									placeholder="Enter your e-mail address here"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></input>
								<button onClick={(event) => handleSend(event)}>
									SEND
								</button>
							</MidEmailInput>
						</MidNewletter>
						{/* <div
							style={{
								display: "block",
								font: '15px "Work sans", sans-serif',
								color: "#DC3232",
							}}
						>
							{isValid ? "" : "This field is required."}
						</div> */}
						<MidSocial>
							<Row gutter={[40, 20]} justify="center ">
								<Col xs={12} sm={6}><a>facebook</a></Col>
								<Col xs={12} sm={6}><a>Instagram</a></Col>
								<Col xs={12} sm={6}><a>Youtube</a></Col>
								<Col xs={12} sm={6}><a>Linkedin</a></Col>
							</Row>
						</MidSocial>
					</MidWrapper>
				</MidInner>
			</MidWrapper>

			<BottomWrapper>
				<BottomCopyRight>
					<p style={{ font: '14px "Work sans"', color: "#B0B0B0" }}>
						© 2022 Simplicity Team, All Rights Reserved
					</p>
				</BottomCopyRight>
			</BottomWrapper>
		</Container>
	);
};

export default Footer;
