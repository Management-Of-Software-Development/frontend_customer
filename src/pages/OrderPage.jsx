import React from "react";
import styled from "styled-components";
import OrderHistoryCell from "../components/common/OrderHistoryCell";
import { List, Col, Row } from "antd";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Inner = styled.div`
	width: 85%;
	margin: 30px 0;
`;

const Title = styled.div`
	padding-bottom: 20px;
	font-weight: 700;
	font-size: 32px;
	letter-spacing: 2px;
	text-align: center;
`;

const ExtraMoney = styled.div`
	text-align: right;
`;

const OrderPage = () => {
	return (
		<Container>
			<Inner>
				<Title>ORDER DETAIL</Title>
				<Row>
					<Col span={8}>
						<Row gutter={[16, 100]}>
							<Col span={12}>Customer Email</Col>
							<Col span={12}>enigma15012001@gmail.com</Col>
						</Row>
						<Row gutter={[16, 24]}>
							<Col span={12}>Shipping Address</Col>
							<Col span={12}>108 Nguyễn Viết Xuân</Col>
						</Row>
						<Row gutter={[16, 24]}>
							<Col span={12}>Payment Method</Col>
							<Col span={12}>COD</Col>
						</Row>
						<Row gutter={[16, 24]}>
							<Col span={12}>Shipping Code</Col>
							<Col span={12}>220511UC4FDFAV</Col>
						</Row>
						<Row gutter={[16, 24]}>
							<Col span={12}>Created Time</Col>
							<Col span={12}>{`thời gian`}</Col>
						</Row>
						<Row gutter={[16, 24]}>
							<Col span={12}>Status</Col>
							<Col span={12}>1</Col>
						</Row>
					</Col>
					<Col span={2}></Col>
					<Col span={14}>
						<OrderHistoryCell />
						<ExtraMoney>
							<Row>
								<Col span={18}></Col>
								<Col span={4}>Shipping Cost</Col>
								<Col span={2}>$7</Col>
								<Col span={2}></Col>
							</Row>
							<Row>
								<Col span={18}></Col>
								<Col span={4}>Discount</Col>
								<Col span={2}>$2</Col>
							</Row>
							<Row>
								<Col span={18}></Col>
								<Col span={4}>Total Price</Col>
								<Col span={2}>$29</Col>
							</Row>
						</ExtraMoney>
					</Col>
				</Row>
			</Inner>
		</Container>
	);
};

export default OrderPage;
