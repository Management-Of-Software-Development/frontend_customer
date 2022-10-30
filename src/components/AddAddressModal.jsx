import React, { useRef, useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import {
	useCreateShippingAddressMutation,
	useUpdateShippingAddressMutation,
} from "../api/shippingAddressApi";
import AddModal from "../components/common/AddModal";
import {
	useGetAllCitiesQuery,
	useGetDistrictByCityCodeQuery,
	useGetWardByDistrictCodeQuery,
} from "../api/areaApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

const AddAddressModal = ({ isEdit, oldAddress, id, onClose }) => {
	const [cityCode, setCityCode] = useState("");
	const [districtCode, setDistrictCode] = useState("");
	const { data: city = [] } = useGetAllCitiesQuery();
	const { data: district = [] } = useGetDistrictByCityCodeQuery(
		cityCode ? { cityCode: cityCode } : skipToken
	);
	const { data: ward = [] } = useGetWardByDistrictCodeQuery(
		districtCode ? { districtCode: districtCode } : skipToken
	);
	const ref = useRef(null);
	useEffect(() => {
		if (isEdit) ref.current.setFieldsValue(oldAddress);
	}, [isEdit, oldAddress]);
	const [createShippingAddress, { isSuccess: isSuccessCreate }] =
		useCreateShippingAddressMutation();
	const [updateShippingAddress, { isSuccess: isSuccessUpdate }] =
		useUpdateShippingAddressMutation();
	const onFinish = (values) => {
		if (isEdit) updateShippingAddress({ id, ...values });
		else createShippingAddress(values);
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			{isSuccessCreate && (
				<AddModal title={"Create New Shipping Address Successfully"} />
			)}
			{isSuccessUpdate && (
				<AddModal title={"Update Shipping Address Successfully"} />
			)}
			<Form
				name="basic"
				ref={ref}
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={
					isEdit
						? oldAddress
						: {
								remember: true,
						  }
				}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="on"
			>
				<Form.Item
					label="Full Name"
					name="receiver_name"
					rules={[
						{
							required: true,
							message: "Please input receiver's name!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Phone Number"
					name="receiver_phone_number"
					rules={[
						{
							required: true,
							message: "Please input receiver's phone number!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="City" name="city">
					<Select
						onChange={(value) =>
							setCityCode(
								city.filter((item) => item.name === value)[0]
									.code
							)
						}
					>
						<Select.Option value="">Select City</Select.Option>
						{city.map((item, index) => (
							<Select.Option key={index} value={item.name}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="District" name="district">
					<Select
						onChange={(value) =>
							setDistrictCode(
								district.filter(
									(item) => item.name === value
								)[0].code
							)
						}
					>
						<Select.Option value="">Select District</Select.Option>
						{district.map((item, index) => (
							<Select.Option key={index} value={item.name}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Ward" name="ward">
					<Select>
						<Select.Option value="">Select Ward</Select.Option>
						{ward.map((item, index) => (
							<Select.Option key={index} value={item.name}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Shipping Address"
					name="address"
					rules={[
						{
							required: true,
							message:
								"Please input receiver's shipping address!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button htmlType="submit" onClick={() => onClose()}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default AddAddressModal;
