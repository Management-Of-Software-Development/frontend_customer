import React from "react";
import { BackTop } from "antd";
import styled from "styled-components";

const Image = styled.img`
	width: 100%;
	height: 100%;
	padding: 5;
	filter: invert(70%);
	border: 1px solid #636363;

	&:hover {
		background: #636363;
		border: none;
		filter: invert(100%);
	}
`;

const ScrollTop = () => {
	return (
		<BackTop style={{ width: 40, height: 40 }}>
			<Image src="../assets/images/scrolltop/back-to-top-icon.png" />
		</BackTop>
	);
};

export default ScrollTop;
