import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import {
	purchaseHistoryTab,
	purchaseHistoryTabStyle,
} from "../constants/purchaseHistoryTab";
import { useGetOrdersQuery, useGetOrderQuery } from "../api/orderApi";

const { TabPane } = Tabs;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Inner = styled.div`
	padding: 10px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.div`
	font-size: 34px;
	line-height: 42px;
	letter-spacing: 8px;
	font-weight: 700;
	text-transform: uppercase;
	margin: 30px 0;
`;

const Board = styled.div`
	width: 800px;
`;

const Item = styled.div`
	margin-top: 20px;
`;

const PurchasingHistory = () => {
	const handleTabClick = (key) => {
		console.log("clicked");
	};

	return (
		<Container>
			<Inner>
				<Title>Purchasing History</Title>
				<Board>
					<Tabs
						defaultActiveKey="0"
						tabPosition={"top"}
						size={"large"}
						onChange={handleTabClick}
						style={purchaseHistoryTabStyle}
					>
						{purchaseHistoryTab.map((item, index) => (
							<TabPane tab={item.tab} key={index}>
								<Item>{item.content}</Item>
							</TabPane>
						))}
					</Tabs>
				</Board>
			</Inner>
		</Container>
	);
};

export default PurchasingHistory;
