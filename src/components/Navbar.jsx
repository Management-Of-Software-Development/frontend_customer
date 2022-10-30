import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalProducts } from "../redux/slices/cartSlice";
import { selectUser } from "../redux/slices/userSlice";

const Container = styled.div`
	border-bottom: 1px solid #ccc;
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Center = styled.div`
	text-align: center;
	a {
		text-decoration: none;
	}
`;

const Logo = styled.h1`
	font-weight: bold;
	margin: inherit;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
`;

const Navbar = () => {
	const totalProduct = useSelector(selectTotalProducts);
	const user = useSelector(selectUser);
	return (
		<Container>
			<Wrapper>
				<Center>
					<Link to="/">
						<Logo>CANDLE IN THE WIND</Logo>
					</Link>
				</Center>
				<Right>
					{!user && (
						<>
							<a
								href={"https://forum.candleinthewindshop.xyz/"}
								target="_blank"
							>
								<MenuItem>FORUM</MenuItem>
							</a>
							<Link to={"/register"}>
								<MenuItem>REGISTER</MenuItem>
							</Link>
							<Link to={"/login"}>
								<MenuItem>SIGN IN</MenuItem>
							</Link>
						</>
					)}
					<Link to={"/cart"}>
						<MenuItem>
							<Badge badgeContent={totalProduct} color="primary">
								<ShoppingCartOutlined />
							</Badge>
						</MenuItem>
					</Link>
					{user && (
						<>
							<a
								href={"https://forum.candleinthewindshop.xyz/"}
								target="_blank"
							>
								<MenuItem>FORUM</MenuItem>
							</a>
							<Link to={"/profile"}>
								<MenuItem>
									<div
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										PROFILE
									</div>
								</MenuItem>
							</Link>
							<Link to={"/logout"}>
								<MenuItem>LOG OUT</MenuItem>
							</Link>
						</>
					)}
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
