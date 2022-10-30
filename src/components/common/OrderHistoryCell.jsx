import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import ProductOrderHistoryCell from "./ProductOrderHistoryCell";

const OrderCell = styled.div`
	width: 100%;
	margin-bottom: 16px;
`;

const TotalPrice = styled.div`
	margin-top: 8px;
	margin-bottom: 8px;
	display: flex;
	justify-content: center;
`;

const OrderContainer = styled.div`
	outline: 1px solid #ccc;
	// outline-bottom: 1px solid #ccc;
	width: 100%;
	&:hover {
		background: #e4e4e4;
	}
`;

const MoneySpan = styled.span`
	font-size: 16px;
	font-weight: bold;
`;

const OrderHistoryCell = ({ orders = [] }) => {
	console.log(orders);
	return (
		<OrderCell>
			{/* truyền props products: ảnh, tên, số lượng, 
      tổng số tiền của từng loại sản phẩm, tổng số tiền của order */}
			{orders.map((item, key) => (
				<OrderContainer key={key}>
					{item?.products
						? item?.products?.map((item, index) => (
								<ProductOrderHistoryCell
									key={index}
									src={item.image}
									title={item.name}
									quantity={item.quantity}
									totalPrice={item.price}
								/>
						  ))
						: null}
					<Row>
						<Col span={24}>
							<Row>
								<Col span={18}></Col>
								<Col span={6}>
									<TotalPrice>
										<MoneySpan>
											Thành tiền: $
											{item.total_product_cost}
										</MoneySpan>
									</TotalPrice>
								</Col>
							</Row>
						</Col>
					</Row>
				</OrderContainer>
			))}
		</OrderCell>
	);
};

export default OrderHistoryCell;
