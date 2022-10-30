import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Button, Modal } from "antd";
import { Add } from "@material-ui/icons";
import AddAddressModal from "../components/AddAddressModal";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
	useGetShippingAddressDetailQuery,
	useGetShippingAddressQuery,
	useDeleteShippingAddressMutation,
} from "../api/shippingAddressApi";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Inner = styled.div`
	width: 90%;
	margin: 30px 0;
`;

const Title = styled.div`
	font-size: 32px;
	letter-spacing: 2px;
	font-weight: 700;
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 30px;
`;

const AddressCell = styled.div`
	border: 1px solid #ccc;
	padding: 10px 20px;
`;

const AddAddressCell = styled.div`
	border: 1px dashed #ccc;
	padding: 10px 20px;
	cursor: pointer;
`;

const AddMoreText = styled.div`
	line-height: 24px;
	font-size: 16px;
`;

const AddressList = () => {
	const [id, setId] = useState("");
	const [params, setParams] = useState({ page: 1, limit: 10 });

	const [isModalVisible, setIsModalVisible] = useState(false);

	const { data: addressDetail } = useGetShippingAddressDetailQuery(
		id ? { id } : skipToken
	);

	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

	const {
		data: addressList = { data: [], paginationInfo: { page: 1, total: 0 } },
		isSuccess,
	} = useGetShippingAddressQuery(params);
	const [deleteAddress] = useDeleteShippingAddressMutation();

	return (
		<Container>
			<Inner>
				<Modal
					title="Add New Address"
					visible={isModalVisible}
					onOk={() => setIsModalVisible(false)}
					onCancel={() => setIsModalVisible(false)}
					footer={null}
				>
					<AddAddressModal onClose={() => setIsModalVisible(false)} />
				</Modal>
				<Modal
					title="Update Address"
					visible={isUpdateModalVisible}
					onOk={() => setIsUpdateModalVisible(false)}
					onCancel={() => setIsUpdateModalVisible(false)}
					footer={null}
				>
					<AddAddressModal
						isEdit={true}
						onClose={() => setIsUpdateModalVisible(false)}
						id={id}
						oldAddress={addressDetail?.address_detail}
					/>
				</Modal>
				<Title>Address List</Title>
				<Row gutter={[16, 16]}>
					{isSuccess
						? addressList.data.map((address, index) => {
								return (
									<Col span={12}>
										<AddressCell>
											<Row gutter={[16, 16]}>
												<Col span={24}>
													<div
														style={{
															textTransform:
																"uppercase",
															fontWeight: "700",
														}}
													>
														{
															address
																.address_detail
																.receiver_name
														}
														<span
															style={{
																fontWeight:
																	"400",
															}}
														>
															{" "}
															|{" "}
														</span>
														{
															address
																.address_detail
																.receiver_phone_number
														}
													</div>
												</Col>
												<Col span={24}>
													{
														address.address_detail
															.city
													}{" "}
													-{" "}
													{
														address.address_detail
															.district
													}{" "}
													-{" "}
													{
														address.address_detail
															.ward
													}{" "}
													-{" "}
													{
														address.address_detail
															.address
													}
												</Col>
												<Col span={24}>
													<Row gutter={[16, 16]}>
														<Col span={3}>
															<Button
																onClick={() => {
																	setId(
																		address._id
																	);
																	setIsUpdateModalVisible(
																		true
																	);
																}}
															>
																Edit
															</Button>
														</Col>
														<Col span={3}>
															<Button
																danger
																onClick={() => {
																	deleteAddress(
																		{
																			id: address._id,
																		}
																	);
																}}
															>
																Delete
															</Button>{" "}
														</Col>
													</Row>
												</Col>
											</Row>
										</AddressCell>
									</Col>
								);
						  })
						: "Cannot found any address"}
					<Col span={12}>
						<AddAddressCell onClick={() => setIsModalVisible(true)}>
							<Row>
								<Col span={2}>
									<div>
										<Add />
									</div>
								</Col>
								<Col span={22}>
									{" "}
									<AddMoreText>Add More Address</AddMoreText>
								</Col>
							</Row>
						</AddAddressCell>
					</Col>
				</Row>
			</Inner>
		</Container>
	);
};

export default AddressList;
