import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderHistoryCell from "../common/OrderHistoryCell";
import { useGetOrdersQuery } from "../../api/orderApi";
import NoOrderYet from "../common/NoOrdersYet";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";

const Container = styled.div``;

const DeliveredOrders = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [getProductsParams, setProductsParams] = useState({
		page: searchParams.get("page") || 1,
		limit: searchParams.get("limit") || 5,
		status: 2,
	});

	const { data: orders, isSuccess } = useGetOrdersQuery(getProductsParams);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [getProductsParams]);

	return (
		<Container>
			{orders?.data ? (
				<OrderHistoryCell orders={orders.data} />
			) : (
				<NoOrderYet />
			)}
			<Pagination
				pageCount={
					isSuccess && orders
						? Math.ceil(orders.paginationInfo.total / 12)
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
		</Container>
	);
};

export default DeliveredOrders;
