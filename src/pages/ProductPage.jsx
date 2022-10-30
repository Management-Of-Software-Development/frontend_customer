import React from "react";
import styled from "styled-components";
import { useGetProductByIdQuery } from "../api/productApi";
import { useParams } from "react-router-dom";
import { addProduct } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import placeholder from "../assets/images/placeholder.png";
import { Col, Row } from "antd";

const ProductPageDetail = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin: 100px 0 100px 0;
`;

const DetailLeft = styled.div`
	width: 100%;
`;

const DetailRight = styled.div`
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Title = styled.div`
	font-size: 39px;
	line-height: 49.13px;
	font-weight: 700;
	letter-spacing: 8px;
`;

const Price = styled.div`
	font-size: 20px;
	line-height: 24px;
	margin-top: 8px;
`;

const Description = styled.div`
	line-height: 1.5rem;
	color: #707070;
	margin-top: 25px;
	letter-spacing: 1px;
`;

const Functions = styled.div`
	margin-top: 40px;
	display: flex;
	align-items: center;
`;

const QuantityContainer = styled.div`
	display: flex;

	& > * {
		height: 40px;
		width: 40px;
		border: 1px solid lightgray;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const Button = styled.button`
	text-transform: uppercase;
	padding: 13px 40px;
	font-size: 12px;
	background-color: black;
	color: white;
	cursor: pointer;
	letter-spacing: 3px;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	font-weight: 700;
	width: 195px;

	&:hover {
		background: transparent;
		color: black;
		border-color: black;
	}

	margin-left: 20px;
`;

const Image = styled.img`
	width: 100%;
	height: auto;
	object-fit: cover;
`;

const ProductPage = () => {
	const { id } = useParams();
	const { data: product = {} } = useGetProductByIdQuery({ id });
	const dispatch = useDispatch();
	const [quantity, setQuantity] = React.useState(1);

	return (
		<ProductPageDetail>
			<Row gutter={[0, 40]} justify="center">
				<Col
					xs={{ span: 24 }}
					md={{ span: 10, offset: 1 }}
					xl={{ span: 8, offset: 2 }}
				>
					<DetailLeft>
						<Image
							src={product?.image || placeholder}
							alt="product"
						/>
					</DetailLeft>
				</Col>
				<Col
					xs={{ span: 22, offset: 1 }}
					md={{ span: 11, offset: 2 }}
					xl={{ span: 10, offset: 2 }}
				>
					<DetailRight>
						<Title>{product?.name || "Unknown"}</Title>
						<Price>$ {product?.price || 0}</Price>
						<Description>
							<div>
								Width: <b>{product?.width || 0}cm</b> - Height:{" "}
								<b>{product?.height}cm</b> - Mass:{" "}
								<b>{product?.mass * 10 || 0}</b>
								gram
							</div>
							<div>
								Currently in stock:{" "}
								<b style={{ color: "red" }}>
									{product?.stock || 0}
								</b>
							</div>
						</Description>
						<Functions>
							<QuantityContainer>
								<div
									style={{
										cursor: "pointer",
										borderRight: 0,
									}}
									onClick={() => {
										setQuantity(
											quantity - 1 < 1 ? 1 : quantity - 1
										);
									}}
								>
									-
								</div>
								<div>{quantity}</div>
								<div
									style={{ cursor: "pointer", borderLeft: 0 }}
									onClick={() => {
										setQuantity(
											quantity + 1 > 10
												? 10
												: quantity + 1
										);
									}}
								>
									+
								</div>
							</QuantityContainer>
							<Button
								onClick={() =>
									dispatch(
										addProduct({ ...product, quantity })
									)
								}
							>
								Add to cart
							</Button>
						</Functions>
					</DetailRight>
				</Col>
			</Row>
		</ProductPageDetail>
	);
};

export default ProductPage;
