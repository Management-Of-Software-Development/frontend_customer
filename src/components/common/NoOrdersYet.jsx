import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Content = styled.div`
	font-size: 18px;
`;

const NoOrdersYet = () => {
	return (
		<Container>
			<Content>No Order Found!</Content>
		</Container>
	);
};

export default NoOrdersYet;
