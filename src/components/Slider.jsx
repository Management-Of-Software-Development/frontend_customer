import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
	overflow: hidden;
	
	@media (max-width: 768px){
		display: none;
	}
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #fcfafa;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 2;
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	transition: all 1.5s ease;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(./assets/images/slider/${(props) => props.bg});
	background-repeat: no-repeat;
	background-size: auto;
	color: white;
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 50px;
`;

const Title = styled.h1`
	font-size: 120px;
	letter-spacing: 65px;
	font-weight: 600;
	color: white;
`;

const Button1 = styled.a`
	padding: 13px 50px;
	font-size: 12px;
	background-color: white;
	color: black !important;
	cursor: pointer;
	letter-spacing: 3px;
	margin-right: 10px;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	font-weight: 700;

	&:hover {
		background: transparent;
		color: white !important;
		border-color: white;
	}
`;

const Button = styled.a`
	padding: 13px 50px;
	font-size: 12px;
	background-color: black;
	color: white;
	cursor: pointer;
	letter-spacing: 3px;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	font-weight: 700;
	width: auto;

	&:hover {
		background: transparent;
		color: black;
		border-color: black;
	}
`;

const Slider = () => {
	useEffect(() => {
		setInterval(() => {
			setSlideIndex((prev) => (prev + 1) % 3);
		}, 10000);
		return () => {
			clearInterval();
		};
	}, []);
	const [slideIndex, setSlideIndex] = useState(0);

	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow direction="left" onClick={() => handleClick("left")}>
				<ArrowLeftOutlined />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{sliderItems.map((item, index) => (
					<Slide
						bg={item.bg}
						active={slideIndex === index}
						key={item.id}
					>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Button1 href="/flame">VIEW MORE</Button1>
							<Button href="/products">SHOP NOW</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow direction="right" onClick={() => handleClick("right")}>
				<ArrowRightOutlined />
			</Arrow>
		</Container>
	);
};

export default Slider;
