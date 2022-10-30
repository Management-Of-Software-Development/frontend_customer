import React from "react";
import styled from "styled-components";
import { CheckBox } from "@material-ui/icons";
import { useNavigate } from "react-router";

const ModalRoot = styled.div`
	display: ${(props) => (props.isAdded ? "block" : "none")};
`;

const ModalMask = styled.div`
	position: fixed;
	inset: 0;
	z-index: 1000;
	height: 100%;
	background-color: #00000073;
`;

const ModalWrap = styled.div`
	position: fixed;
	top: 35%;
	left: 37.5%;
	overflow: auto;
	outline: 0;
	z-index: 1000;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 2px;
	box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
		0 9px 28px 8px #0000000d;
	color: black;
	width: 400px !important;
	height: 200px !important;
`;

const Modal = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-weight: 400;
	font-size: 18px;
	width: 300px;
	height: 100px;
`;

const AddModal = ({ title, path, callback }) => {
	const [isAdded, setIsAdded] = React.useState(false);
	const navigate = useNavigate();
	React.useEffect(() => {
		setIsAdded(true);
		const timer = setTimeout(() => {
			setIsAdded(false);
			if (path) {
				navigate(path);
			}
			if (callback) {
				callback();
			}
		}, 1500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<ModalRoot isAdded={isAdded}>
			<ModalMask />
			<ModalWrap>
				<Modal>
					<CheckBox style={{ marginBottom: "10px" }} />
					{title || "Product added to cart!"}
				</Modal>
			</ModalWrap>
		</ModalRoot>
	);
};

export default AddModal;
