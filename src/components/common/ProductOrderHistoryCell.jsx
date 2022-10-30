import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

const Info = styled.div`
	// border-top: 1px solid #ccc;
	// border-bottom: 1px solid #ccc;
	margin: 15px 0;
	padding: 20px 10px;
`;

const Img = styled.img`
	width: 75px;
	height: 75px;
`;

const ProductOrderHistoryCell = (props) => {
	return (
		<Info>
			<Row>
				<Col span={4}>
					<Img src={props.src} />
				</Col>
				<Col span={20}>
					<Row>
						<Col span={21}>
							<Row>
								<Col span={24}>{props.title}</Col>
								<Col span={24}>x{props.quantity}</Col>
							</Row>
						</Col>
						<Col span={1}></Col>
						<Col span={2}>${props.totalPrice}</Col>
					</Row>
				</Col>
			</Row>
		</Info>
	);
};

export default ProductOrderHistoryCell;
