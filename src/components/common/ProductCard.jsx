import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import AddModal from "./AddModal";
import placeholder from "../../assets/images/placeholder.png";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > * > * {
		width: 100%;
	}
	.image-container {
		padding-top: 100%;
		object-fit: cover;
		position: relative;
		height: 0;
		width: 100%;
	}
`;

const Image = styled.img`
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	object-fit: cover;
	width: 100%;
	height: 100%;
	&:hover {
	}
`;

const Title = styled.div`
	text-align: center;
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 3px;
	line-height: 21.95px;
	margin-top: 12px;
`;

const Price = styled.div`
	line-height: 28.22px;
	text-align: center;
`;

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

const ProductCard = ({ item }) => {
	const [isAdded, setIsAdded] = useState(false);
	const dispatch = useDispatch();
	const handleClick = (item) => {
		dispatch(addProduct({ ...item, quantity: 1 }));
		setIsAdded(true);
	};

	return (
		<Container>
			<div className="image-container">
				<Link to={`/product/${item._id}`}>
					<Image src={item.image || placeholder} />
				</Link>
			</div>
			<Title>{item.name || "No Name"}</Title>
			<Price>$ {item.price || "Free"}</Price>
			<Button onClick={() => handleClick(item)}>ADD TO CART</Button>
			{isAdded && <AddModal />}
		</Container>
	);
};

export default ProductCard;
