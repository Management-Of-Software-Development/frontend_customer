import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../components/common/ProductCard";
import { Col, Row } from "antd";
import { useGetAllProductsQuery } from "../api/productApi";
import {
	useGetAllCategoriesQuery,
} from "../api/categoryApi";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
	margin-top: 30px;
	padding: 0 5%;

	@media (max-width: 576px) {
		padding: 0 2%;
	}
`;

const ProductsInCategory = styled.div`
	padding-bottom: 60px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;

	@media (max-width: 576px) {
		grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
		gap: 5px;
	}
`;

const ProductList = ({ title }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [getProductsParams, setProductsParams] = useState({
		page: searchParams.get("page") || 1,
		limit: searchParams.get("limit") || 12,
		category: searchParams.get("category") || "",
		scent: searchParams.get("category") || "",
	});
	const [chosenItem, setChosenItem] = useState();

	function handlePressItem(index) {
		//
		setChosenItem(index);
	}
	const {
		isSuccess,
		data: allProducts = { data: [], paginationInfo: { page: 1, total: 0 } },
	} = useGetAllProductsQuery(getProductsParams);
	const { data: categories = [] } = useGetAllCategoriesQuery();

	const [width, setWidth] = useState(0);

	useEffect(() => {
		const updateWindowDimensions = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
		};

		window.addEventListener("resize", updateWindowDimensions);

		return () =>
			window.removeEventListener("resize", updateWindowDimensions);
	}, []);

	return (
		<Container>
			<Row style={{ marginTop: 50 }} justify="space-between">
				<Col lg={4}>
					<h2>CATEGORIES</h2>
					<h3
						onMouseOver={() => handlePressItem("all")}
						onMouseLeave={() => setChosenItem(undefined)}
						onClick={() => {
							setProductsParams({
								...getProductsParams,
								category: "",
								page: 1,
								limit: 12,
							});
							setSearchParams({
								...searchParams,
								category: "",
								page: 1,
								limit: 12,
							});
						}}
						style={{
							...(chosenItem === "all" && {
								background: "rgba(0,0,0,0.1)",
							}),
							borderRadius: "10px",
							padding: "5px 15px 5px 15px",
							cursor: "pointer",
						}}
					>
						All
					</h3>
					{categories.map((item, index) => (
						<h3
							key={item.slug}
							onMouseOver={() => handlePressItem(item.slug)}
							onMouseLeave={() => setChosenItem(undefined)}
							onClick={() => {
								setProductsParams({
									...getProductsParams,
									category: item.slug,
									page: 1,
									limit: 12,
									scent: "",
								});
								setSearchParams({
									...searchParams,
									category: item.slug,
									page: 1,
									limit: 12,
									scent: "",
								});
							}}
							style={{
								...(chosenItem === item.slug && {
									background: "rgba(0,0,0,0.1)",
								}),
								borderRadius: "5px",
								padding: "5px 15px 5px 15px",
								cursor: "pointer",
							}}
						>
							{item.name}
						</h3>
					))}
				</Col>
				<Col xs={24} sm={24} lg={{ span: 18, offset: 1 }}>
					<ProductsInCategory>
						{isSuccess && allProducts
							? allProducts.data.map((item) => (
									<ProductCard item={item} />
							  ))
							: "Không có sản phẩm nào"}
					</ProductsInCategory>
				</Col>
			</Row>
			<Row justify={width < 992 ? "center" : "end"}>
				<Pagination
					pageCount={
						isSuccess && allProducts
							? Math.ceil(allProducts.paginationInfo.total / 12)
							: 0
					}
					forcePage={getProductsParams.page - 1}
					onPageChange={({ selected }) => {
						setProductsParams({
							...getProductsParams,
							page: selected + 1,
						});
					}}
				/>
			</Row>
		</Container>
	);
};

export default ProductList;
