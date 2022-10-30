import React from "react";
import styled from "styled-components";
import { Col } from "antd";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 245px;
	& > * {
		width: 100%;
	}
`;

const Image = styled.img`
	height: 325px;
	object-fit: cover;
`;

const Info = styled.div`
	text-transform: uppercase;
	font-size: 22px;
	letter-spacing: 3px;
	font-weight: 700;
	line-height: 24px;
	height: 54px;
	margin-top: 20px;
`;

const Description = styled.div`
	color: lightgrey;
	margin-bottom: 20px;
`;

const Button = styled.a`
	cursor: pointer;
	width: initial;
	color: black;
	text-decoration: none;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 3px;
	border-bottom: 1px solid transparent;
	transition: all 0.45s ease-in;

	&:hover {
		background: transparent;
		border-bottom: 1px solid black;
	}
`;

const CategoryItem = ({ item }) => {
	return (
		<Col>
			<Container>
				<Image src={item.img} />
				<Info>{item.title}</Info>
				<Description>{item.description}</Description>
				<Button href={`/products?category=${item.slug}`}>
					EXPLORE
				</Button>
			</Container>
		</Col>
	);
};

export default CategoryItem;
