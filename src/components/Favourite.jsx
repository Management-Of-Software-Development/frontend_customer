import React from "react";
import styled from "styled-components";
import { useGetProductByIdQuery } from "../api/productApi";

const Container = styled.div`
	margin: 100px 0 200px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 700px;
	@media (max-width: 1400px){
		margin: 50px 0 150px 0;
	}

	@media (max-width: 1200px){
		margin: 50px 0 0 0;
	}

	@media (max-width: 992px){
		margin: 50px 0 0 0;
	}


`;

const Left = styled.div`
	width: 50%;
	height: 100%;
	position: relative;
	.img1 {
		width: 65%;
		position: absolute;
		top: 0;
		left: 20%;
	}
	.img2 {
		width: 55%;
		position: absolute;
		top: 55%;
		left: 40%;
	}

	@media (max-width: 992px){
		display: none;
	}
`;

const Right = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	h3 {
		font: 28px "Work sans", sans-serif;
		font-weight: 700;
		color: #000000;
		margin: 9px 0px 0px;
		letter-spacing: 5px;
		word-spacing: 5px;
	}
	img {
		display: block;
		width: 55%;
		margin-bottom: 30px;

		@media (max-width: 992px){
			width: 60%
        }

		@media (max-width: 768px){
			width: 70%
        }

		@media (max-width: 576px){
			width: 80%
        }
	}

	p {
		width: 45%;
		font: 15px "Work sans", sans-serif;
		color: #707070;
		text-align: center;
		
		@media (max-width: 992px){
			width: 55%
        }

		@media (max-width: 768px){
			width: 65%
        }

		@media (max-width: 576px){
			width: 75%
        }
	}
	button {
		font: '12px "Work sans", sans-serif';
		font-weight: 800;
		color: "#000000";
		letter-spacing: 2px;
		margin: 10px 0px 0px;
		background: none;
		border: none;
		border-bottom: 1px solid black;
	}

	@media (max-width: 992px){
		width: 100%;
		height: 50%
	}
`;

const Name = styled.div`
	font-size: 24px;
	margin-bottom: 10px;
`;

const Favourite = () => {
	const id = "62835f4faeba23ff08e7ff65";
	const { data: product = {} } = useGetProductByIdQuery({ id });
	return (
		<Container>
			<Left>
				<img
					className="img1"
					src="./assets/images/favourite/h1-img-03.jpg"
					alt="product"
				/>
				<img
					className="img2"
					alt="product"
					src="./assets/images/favourite/h1-img-04.jpg"
				/>
			</Left>
			<Right>
				<img src={product.image} alt="h1-img-08"></img>

				<h3>OUR FAVOURITES</h3>
				<Name>{product.name}</Name>
				<p>
					With rich in nutrients, goat milk soap is a gentle cleanser,
					natural exfoliant. They help you to improve dry skin,
					prevent acne and support a healthy skin microbiome.
				</p>
			</Right>
		</Container>
	);
};

export default Favourite;
