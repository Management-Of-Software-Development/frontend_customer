import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { Row, Col } from "antd";

const Outer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 40px;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 50px 0 10px 0;
`;

const TitleText = styled.h2`
	letter-spacing: 5px;
	font-size: 32px;
	margin-top: 15px;
	font-weight: 700;
`;

const Container = styled.div`
	width: 95%;
`;

const Categories = () => {
	return (
		<Outer>
			<Title>
				<TitleText>CATEGORIES</TitleText>
			</Title>
			<Container>
				<Row gutter={[{sm: 10, xl: 40 }, 40]} justify='center'>
					{categories.map((item, index) => (
						<Col xs={24} sm={12} xl={6} key={index} style={{display:'flex' , justifyContent:'center'}}>
							<CategoryItem item={item} />
						</Col>
					))}
				</Row>
			</Container>
		</Outer>
	);
};

export default Categories;
