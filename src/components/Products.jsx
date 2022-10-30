import React from "react";
import styled from "styled-components";
import ProductCard from "./common/ProductCard";
import { useGetAllProductsQuery } from "../api/productApi";
import { Row, Col, Space } from 'antd';

const Outer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 50px 0;
`;

const TitleSecondaryText = styled.div`
	text-transform: uppercase;
	letter-spacing: 3px;
	font-weight: 600;
	font-size: 12px;
`;

const TitleText = styled.h2`
	text-align: center;
	letter-spacing: 5px;
	font-size: 32px;
	margin-top: 15px;
	font-weight: 700;
`;

const Container = styled.div`
	width: 85%;
`;

const Button = styled.a`
	cursor: pointer;
	width: initial;
	color: black;
	text-decoration: none;
	font-size: 16px;
	font-weight: 700;
	margin-top: 20px;
	letter-spacing: 3px;
	padding: 10px 0;
	border-bottom: 1px solid transparent;
	transition: all 0.45s ease-in;
	color: black;

	&:hover {
		border-color: black;
	}
`;

const Products = () => {
	const {
		data: products = { data: [], paginationInfo: { page: 1, total: 0 } },
	} = useGetAllProductsQuery({ page: 1, limit: 4 });
	return (
		<Outer>
			<Title>
				<TitleSecondaryText>Candles & Difusers</TitleSecondaryText>
				<TitleText>WEEKLY BEST SELLERS</TitleText>
			</Title>
			<Container>
				<Row gutter={[{sm: 16, md: 32, lg: 48, xl: 64 }, 40]} justify='center'>
					{products.data.map((item) => (
						<Col key={item._id} xs={24} sm={12} lg={6}>
							<ProductCard item={{ ...item, name: item.name, image: item.image }}/>
						</Col>
					))}
				</Row>
			</Container>
			<Button href="/products">VIEW ALL</Button>
		</Outer>
	);
};

export default Products;
