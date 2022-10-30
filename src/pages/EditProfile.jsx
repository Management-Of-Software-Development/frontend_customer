import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import { userProfileTab } from "../constants/userProfileTab";

const { TabPane } = Tabs;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
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

const EditProfile = () => {
	return (
		<Container>
			<Inner>
				<Title>Edit Profile</Title>
				<div style={{ width: "85%" }}>
					<Tabs
						defaultActiveKey="0"
						tabPosition={"left"}
						size={"large"}
						style={{
							height: 300,
							width: "100%",
							color: "black",
						}}
					>
						{userProfileTab.map((item, index) => (
							<TabPane tab={item.text} key={index}>
								{item.content}
							</TabPane>
						))}
					</Tabs>
				</div>
			</Inner>
		</Container>
	);
};

export default EditProfile;
