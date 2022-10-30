import { skipToken } from "@reduxjs/toolkit/query/react";
import { Button, Modal, Select, Row, Col } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
	useGetAllCitiesQuery,
	useGetDistrictByCityCodeQuery,
	useGetWardByDistrictCodeQuery,
} from "../api/areaApi";
import { useGetApplyingDiscountAmountQuery } from "../api/discountCodeApi";
import {
	useCreateLoyalOrderMutation,
	useCreateOrderMutation,
} from "../api/orderApi";
import { useGetShippingAddressQuery } from "../api/shippingAddressApi";
import placeholder from "../assets/images/placeholder.png";
import AddModal from "../components/common/AddModal";
import {
	addProduct,
	removeAllProduct,
	removeIndividualProduct,
	removeProduct,
	selectAllProducts,
} from "../redux/slices/cartSlice.js";
import isUserLoggedin from "../utils/isUserLoggedin";
import { useGetUserInfoQuery } from "../api/userApi";
import VouchersList from "./VouchersList.jsx";
import jwt_decode from "jwt-decode";

const { Option } = Select;

const CartContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Detail = styled.div`
	width: 85%;
	margin-top: 100px;
`;

const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	& > div {
		font-size: 18px;
		width: 20%;
		padding: 10px 10px;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 3px;
	}
`;

const List = styled.div`
	width: 100%;
	display: flex;
	position: relative;

	& > div {
		width: 20%;
		padding: 10px 10px;

		display: flex;
		align-items: center;
	}
`;

const ImgContainer = styled.div`
	display: flex;
	justify-content: flex-end !important;
`;

const Img = styled.img`
	width: 105px;
	height: 124px;
`;

const Name = styled.div`
	color: grey;
`;

const Price = styled.div``;

const QuantityContainer = styled.div`
	display: flex;

	& > * {
		height: 40px;
		width: 40px;
		border: 1px solid lightgray;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const SubTotal = styled.div``;

const CartTotals = styled.div`
	width: 85%;
	margin-top: 100px;
`;

const CartTotalsTitle = styled.div`
	font-size: 34px;
	line-height: 42px;
	letter-spacing: 8px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 10px;
`;

const CartTotalItems = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-bottom: 30px;

	& > div {
		display: flex;
		justify-content: flex-start;
	}
`;

const CartTotalSubtotal = styled.div`
	width: auto;
`;

const Shipping = styled.div``;

const CheckoutButton = styled.button`
	text-transform: uppercase;
	padding: 13px 40px;
	font-size: 12px;
	background-color: black;
	color: white;
	cursor: pointer;
	letter-spacing: 3px;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	font-weight: 700;
	width: 195px;

	&:hover {
		background: transparent;
		color: black;
		border-color: black;
	}
	margin-bottom: 40px;
`;

const Left = styled.div`
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 3px;
	padding: 20px 0;
	min-width: 35%;

	display: flex;
	align-items: center;
`;

const FormGroup = styled.div`
	display: flex;
`;
const Right = styled.div`
	padding: 20px 0;
	width: 40%;
	display: flex;
	flex-direction: column;

	& > div {
		display: flex;
		align-items: center;
		line-height: 28px;
	}
	& > input {
		height: 40px;
		padding: 0px 8px;
		border: 1px solid grey;
	}
	& > select {
		height: 40px;
	}
`;

const X = styled.div`
	position: absolute;
	left: 0;
	top: 35%;
`;

const Cart = () => {
	const { data: userData = {} } = useGetUserInfoQuery();

	const [values, setValues] = React.useState({});

	const products = useSelector(selectAllProducts);

	const totalPrice = products
		.filter((item) => item.type === "commercial")
		.reduce((acc, curr) => {
			return acc + curr.price * curr.quantity;
		}, 0);

	const totalPoint = products
		.filter((item) => item.type === "appreciation")
		.reduce((acc, curr) => {
			return acc + curr.point * curr.quantity;
		}, 0);

	const dispatch = useDispatch();

	const [createOrder, { isSuccess: isSuccess1 }] = useCreateOrderMutation();

	const [createLoyalOrder, { isSuccess: isSuccess2 }] =
		useCreateLoyalOrderMutation();

	const { data: allCities = [] } = useGetAllCitiesQuery();
	const {
		data: shippingAddress = {
			data: [],
			paginationInfo: { page: 1, total: 0 },
		},
	} = useGetShippingAddressQuery({ page: 1, limit: 10 });

	const { data: districtsByCity = [] } = useGetDistrictByCityCodeQuery(
		values?.city && allCities?.length > 0
			? {
					cityCode: allCities.filter(
						(item) => item.name === values.city
					)[0].code,
			  }
			: skipToken
	);

	const { data: wardByDistrict = [] } = useGetWardByDistrictCodeQuery(
		values?.district && districtsByCity?.length > 0
			? {
					districtCode: districtsByCity.filter(
						(item) => item.name === values.district
					)[0].code,
			  }
			: skipToken
	);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const [voucher, setVoucher] = useState({
		code: "",
		name: "",
	});

	const [voucherButtonContent, setVoucherButtonContent] =
		useState("Select Voucher");
	const { data: discount_amount = 0, isError } =
		useGetApplyingDiscountAmountQuery(
			voucher.code
				? {
						discount_code: voucher.code,
						total_product_cost: totalPrice,
				  }
				: skipToken
		);

	const handleSelectVoucher = (record) => {
		setIsModalVisible(false);
		setVoucher(record);
		setVoucherButtonContent(`${record.code}`);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	console.log(isUserLoggedin());
	return (
		<CartContainer>
			<Modal
				title="Voucher List"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<VouchersList handleSelectVoucher={handleSelectVoucher} />
			</Modal>
			<Detail>
				<Header>
					<div style={{ textAlign: "right" }}>Product</div>
					<div> </div>
					<div>Price</div>
					<div>Quantity</div>
					<div>Subtotal</div>
				</Header>
				<hr />
				{products
					.filter((item) => item.type === "commercial")
					.map((item, index) => (
						<>
							<List>
								<X
									onClick={() =>
										dispatch(removeIndividualProduct(item))
									}
								>
									X
								</X>
								<ImgContainer>
									<Img
										src={item?.image || placeholder}
										alt="product image"
									></Img>
								</ImgContainer>
								<Name>{item?.name || ""}</Name>
								<Price>$ {item?.price || 0}</Price>
								<QuantityContainer>
									<div
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch(removeProduct(item))
										}
									>
										-
									</div>
									<div>{item?.quantity || 1}</div>
									<div
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch(addProduct(item))
										}
									>
										+
									</div>
								</QuantityContainer>
								<SubTotal>
									$ {item?.price * item?.quantity || 0}
								</SubTotal>
								<hr />
							</List>
						</>
					))}
				<hr style={{ height: "3px", backgroundColor: "#f3f3f3" }} />
				{products
					.filter((item) => item.type === "appreciation")
					.map((item, index) => (
						<>
							<List>
								<X
									onClick={() =>
										dispatch(removeIndividualProduct(item))
									}
								>
									X
								</X>
								<ImgContainer>
									<Img
										src={item?.image || placeholder}
										alt="product image"
									></Img>
								</ImgContainer>
								<Name>{item?.name || ""}</Name>
								<Price>{item?.point || 0} points</Price>
								<QuantityContainer>
									<div
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch(removeProduct(item))
										}
									>
										-
									</div>
									<div>{item?.quantity || 1}</div>
									<div
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch(addProduct(item))
										}
									>
										+
									</div>
								</QuantityContainer>
								<SubTotal>
									{item?.point * item?.quantity || 0} points
								</SubTotal>
								<hr />
							</List>
						</>
					))}
			</Detail>
			<CartTotals>
				<form>
					<CartTotalsTitle>ORDER DETAIL</CartTotalsTitle>
					<CartTotalItems>
						<Row>
							<Col span={16}>
								<Button
									style={{
										width: "75%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									onClick={showModal}
								>
									{voucherButtonContent}
								</Button>
								{shippingAddress?.data &&
								Object.keys(shippingAddress.data).length > 0 ? (
									<Select
										defaultValue=""
										onChange={(value) => {
											let shipping =
												shippingAddress.data.filter(
													(item) => item._id === value
												)[0].address_detail;
											setValues({
												...values,
												receiver_name:
													shipping?.receiver_name,
												receiver_phone_number:
													shipping?.receiver_phone_number,
												city: shipping?.city,
												district: shipping?.district,
												ward: shipping?.ward,
												shipping_address:
													shipping?.address,
											});
										}}
										style={{ width: "75%" }}
									>
										<Option value="">
											Select Shipping Address
										</Option>
										{shippingAddress.data.map(
											(item, index) => (
												<Option value={item._id}>
													{
														item.address_detail
															.receiver_name
													}{" "}
													-{" "}
													{
														item.address_detail
															.receiver_phone_number
													}
												</Option>
											)
										)}
									</Select>
								) : (
									<></>
								)}

								<FormGroup>
									<Left>Fullname</Left>
									<Right>
										<input
											type="text"
											name="fullname"
											value={values.receiver_name}
											onChange={(e) =>
												setValues({
													...values,
													receiver_name:
														e?.target?.value,
												})
											}
										/>
									</Right>
								</FormGroup>
								<FormGroup>
									<Left>Email</Left>
									<Right>
										<input
											type="email"
											name="email"
											value={
												values?.email || userData?.email
											}
											disabled={
												userData?.email ? true : false
											}
											onChange={(e) =>
												setValues({
													...values,
													email: e?.target?.value,
												})
											}
										/>
									</Right>
								</FormGroup>
								{/* <FormGroup>
							<Left>Discount</Left>
							<Right>
								<input
									type="text"
									name="discount"
									value={values.discount}
									onChange={(e) =>
										setValues({
											...values,
											discount: e?.target?.value,
										})
									}
								/>
							</Right>
						</FormGroup> */}
								<FormGroup>
									<Left>Phone</Left>
									<Right>
										<input
											type="text"
											name="phone"
											value={values.receiver_phone_number}
											onChange={(e) =>
												setValues({
													...values,
													receiver_phone_number:
														e?.target?.value,
												})
											}
										/>
									</Right>
								</FormGroup>
								<FormGroup>
									<Left>City</Left>
									<Right>
										<select
											name="city"
											value={values.city}
											onChange={(e) => {
												setValues({
													...values,
													city: e?.target?.value,
												});
											}}
										>
											<option value="">
												Select City
											</option>
											{allCities.map((city) => (
												<option
													key={city.code}
													value={city.name}
												>
													{city.name}
												</option>
											))}
										</select>
									</Right>
								</FormGroup>
								<FormGroup>
									<Left>District</Left>
									<Right>
										<select
											name="district"
											value={values.district}
											onChange={(e) => {
												setValues({
													...values,
													district: e?.target?.value,
												});
											}}
										>
											<option value="">
												Select District
											</option>
											{districtsByCity.map((district) => (
												<option
													key={district.code}
													value={district.name}
												>
													{district.name}
												</option>
											))}
										</select>
									</Right>
								</FormGroup>
								<FormGroup>
									<Left>Ward</Left>
									<Right>
										<select
											name="ward"
											value={values.ward}
											onChange={(e) =>
												setValues({
													...values,
													ward: e?.target?.value,
												})
											}
										>
											<option value="">
												Select Ward
											</option>
											{wardByDistrict.map((ward) => (
												<option
													key={ward.code}
													value={ward.name}
												>
													{ward.name}
												</option>
											))}
										</select>
									</Right>
								</FormGroup>
								<FormGroup>
									<Left>Payment Method</Left>
									<Right>
										<select
											name="payment_method"
											value={values.payment_method}
											onChange={(e) =>
												setValues({
													...values,
													payment_method:
														e?.target?.value,
												})
											}
										>
											<option value="">
												Select Payment Method
											</option>
											<option value="COD">COD</option>
										</select>
									</Right>
								</FormGroup>
								<Shipping>
									<Left>Shipping Address</Left>
									{/* <Right> */}
									<textarea
										style={{ width: "75%" }}
										type="text"
										name="shipping_address"
										cols={30}
										value={values.shipping_address}
										onChange={(e) =>
											setValues({
												...values,
												shipping_address:
													e?.target?.value,
											})
										}
										// style={{ resize: "vertical" }}
										rows={8}
										id="shipping_address"
									/>
									{/* </Right> */}
								</Shipping>
							</Col>
							<Col span={8}>
								<CartTotalSubtotal>
									<Left>Merchandise Subtotal:</Left>
									<Right>$ {totalPrice}</Right>
								</CartTotalSubtotal>
								<CartTotalSubtotal>
									<Left>Voucher</Left>
									<Right>
										{voucher.name} - {voucher.code} -
										{voucher.discount_amount}
									</Right>
								</CartTotalSubtotal>
								{voucher && (
									<CartTotalSubtotal>
										<Left>Discount</Left>
										<Right>
											{isError
												? "Cannot apply this coupon"
												: "$ " + discount_amount}
										</Right>
									</CartTotalSubtotal>
								)}
								<CartTotalSubtotal>
									<Left>Total Points</Left>
									<Right>{totalPoint} points</Right>
								</CartTotalSubtotal>
								<CartTotalSubtotal>
									<Left>Total Payment</Left>
									<Right>
										${" "}
										{!isError
											? totalPrice - discount_amount
											: totalPrice}
									</Right>
								</CartTotalSubtotal>
								<CheckoutButton
									type="submit"
									onClick={async (e) => {
										e.preventDefault();
										if (!isUserLoggedin())
											await createOrder({
												discount_code: voucher.code,
												customer_email: values.email,
												shipping_address: {
													receiver_name:
														values.receiver_name,
													receiver_phone_number:
														values.receiver_phone_number,
													city: values.city,
													district: values.district,
													ward: values.ward,
													address:
														values.shipping_address,
												},
												payment_method:
													values.payment_method,
												products: products
													.filter(
														(item) =>
															item.type ===
															"commercial"
													)
													.map((product) => ({
														product_id: product._id,
														quantity: Number(
															product.quantity
														),
														name: product.name,
														price: Number(
															product.price
														),
														image: product.image,
													})),

												total_product_cost:
													Number(totalPrice) -
													Number(discount_amount),
											});
										else {
											await createLoyalOrder({
												discount_code: voucher.code,
												customer_email: values.email,
												shipping_address: {
													receiver_name:
														values.receiver_name,
													receiver_phone_number:
														values.receiver_phone_number,
													city: values.city,
													district: values.district,
													ward: values.ward,
													address:
														values.shipping_address,
												},
												payment_method:
													values.payment_method,
												products: products
													.filter(
														(item) =>
															item.type ===
															"commercial"
													)
													.map((product) => ({
														product_id: product._id,
														quantity: Number(
															product.quantity
														),
														name: product.name,
														price: Number(
															product.price
														),
														image: product.image,
													})),
												gifts: products
													.filter(
														(item) =>
															item.type ===
															"appreciation"
													)
													.map((product) => ({
														product_id: product._id,
														quantity: Number(
															product.quantity
														),
														name: product.name,
														point: Number(
															product.point
														),
														image: product.image,
													})),

												total_product_cost:
													Number(totalPrice),
											});
										}
									}}
								>
									Checkout
								</CheckoutButton>
							</Col>
						</Row>
					</CartTotalItems>
				</form>
			</CartTotals>
			{isSuccess1 || isSuccess2 ? (
				<AddModal
					title={"Đặt hàng thành công"}
					path="/"
					callback={() => {
						dispatch(removeAllProduct());
					}}
				/>
			) : null}
		</CartContainer>
	);
};

export default Cart;
