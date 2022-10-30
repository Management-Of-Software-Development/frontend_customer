import React, { useState, useEffect } from "react";
import { Avatar, Upload } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { GrNotes, GrGift } from "react-icons/gr";
import MemberCard from "../components/MemberCard";
import { useGetUserInfoQuery } from "../api/userApi";
import { uploadImage } from "../services/image.service";

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px 20px;
`;

const Inner = styled.div`
	width: 60%;
	display: flex;
	flex-direction: row;
	border: 1px solid #ccc;
`;

const Left = styled.div`
	width: 30%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0;
`;

const AvatarStyled = styled(Avatar)`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	margin-bottom: 10px;
`;
const ProfileName = styled.h3`
	font-size: 28px;
	font-weight: 700;
	letter-spacing: 2px;
	margin-bottom: -5px;
`;

const ButtonWrapper = styled.div`
	button {
		margin-bottom: 2px;
		font-size: 14px;
		border: none;
		width: max-content;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}
`;
const Right = styled.div`
	/* font-size: 20px; */
	width: 70%;
	padding: 20px 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Field = styled.div`
	font-size: 16px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	margin-bottom: 20px;
`;
const FieldContent = styled.div`
	width: 350px;
	height: 35px;
	border-radius: 5px;
	display: flex;
	align-items: flex-start;
`;

const FieldLabel = styled.div`
	width: 150px;
	text-transform: uppercase;
	font-weight: 700;
	/* margin-right: 35px; */
	height: 50px;
`;

const User = () => {
	const navigate = useNavigate();
	const { data: user } = useGetUserInfoQuery();
	const [avatarURL, setAvatarURL] = useState(
		"https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360"
	);
	console.log(user?.avatar);
	const handleUploadAvatar = (e) => {
		uploadImage(e.file.name, e.file, setAvatarURL);
	};
	useEffect(() => {
		if (localStorage.getItem("avatar")) {
			setAvatarURL(localStorage.getItem("avatar"));
		} else if (user?.avatar) {
			setAvatarURL(user.avatar);
		}
	}, [user]);
	console.log(avatarURL);
	return (
		<Container>
			<Inner>
				<Left>
					<Upload
						showUploadList={false}
						customRequest={handleUploadAvatar}
					>
						<AvatarStyled src={avatarURL}></AvatarStyled>
					</Upload>
					<ProfileName>{user?.fullname}</ProfileName>
					<ButtonWrapper>
						<button onClick={() => navigate(`/edit-profile`)}>
							<AiFillEdit style={{ marginRight: "5px" }} />
							Edit profile
						</button>
						<button onClick={() => navigate("/history")}>
							<GrNotes style={{ marginRight: "5px" }} />
							Purchasing History
						</button>
						<button onClick={() => navigate("/address-list")}>
							<GrNotes style={{ marginRight: "5px" }} />
							Shipping Address
						</button>
						<button
							onClick={() => navigate("/appreciation-products")}
						>
							<GrGift style={{ marginRight: "5px" }} />
							Gifts
						</button>
					</ButtonWrapper>
				</Left>

				<Right>
					<Field>
						<FieldLabel>
							<p>Fullname</p>
						</FieldLabel>
						<FieldContent>{user?.fullname}</FieldContent>
					</Field>
					<Field>
						<FieldLabel>
							<p>email</p>
						</FieldLabel>
						<FieldContent>{user?.email}</FieldContent>
					</Field>
					<Field>
						<FieldLabel>
							<p>phone number</p>
						</FieldLabel>
						<FieldContent>{user?.phone}</FieldContent>
					</Field>
					<Field>
						<FieldLabel>Membership</FieldLabel>
						<div>
							<MemberCard
								rank={user?.rank}
								id={user?._id}
								name={user?.fullname}
								point={user?.point}
							></MemberCard>
						</div>
					</Field>
				</Right>
			</Inner>
		</Container>
	);
};

export default User;
