import React from "react";
import styled from "styled-components";
import { AiFillCrown } from "react-icons/ai";
import { DIAMOND, GOLD, SILVER } from "../constants/membershipLevel";
import { MEMBER_RANK } from "../constants/membershipLevel";

const Card = styled.div`
	width: 350px;
	height: 200px;
	background-color: ${({ rank }) =>
		(rank === 0 && "#DCD7C9") ||
		(rank === 1 && "#748DA6") ||
		(rank === 2 && "#FFD24C") ||
		(rank === 3 && "#1B2430")};
	color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CardInner = styled.div`
	width: 85%;
	display: flex;
	flex-direction: column;
`;
const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 2px;
	margin-bottom: 20px;
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center;
	justify-content: flex-start; */
`;

const Field = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: flex-start;
`;
const Label = styled.div`
	font-size: 12px;
`;
const Value = styled.div`
	font-weight: 600;
	text-transform: uppercase;
	font-size: 16px;
`;

const MemberCard = ({ rank, id, name, point }) => {
	return (
		<Card rank={rank}>
			<CardInner>
				<Title>
					<AiFillCrown style={{ marginRight: "3px" }} />
					{MEMBER_RANK[rank]} Member
				</Title>

				<CardContent>
					<Field>
						<Label>ID</Label>
						<Value>{id}</Value>
					</Field>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "10px",
						}}
					>
						<Field>
							<Label>Name</Label>
							<Value>{name}</Value>
						</Field>

						<Field>
							<Label>Bonus Point</Label>
							<Value>{point}</Value>
						</Field>
					</div>
				</CardContent>
			</CardInner>
		</Card>
	);
};
export default MemberCard;
