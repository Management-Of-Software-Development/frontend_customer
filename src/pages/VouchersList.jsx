import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import { fakeVouchers } from "../constants/fakeVouchers";
import { useGetDiscountsQuery } from "../api/discountCodeApi";

const columns = [
	{
		title: "NAME",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "CODE",
		dataIndex: "code",
		key: "code",
	},
	{
		title: "DESCRIPTION",
		dataIndex: "description",
		key: "description",
	},
];

const VouchersList = ({ handleSelectVoucher }) => {
	const { data: discounts } = useGetDiscountsQuery();
	return (
		<Table
			onRow={(record) => {
				return {
					onClick: () => {
						handleSelectVoucher(record);
					},
				};
			}}
			dataSource={discounts?.data || []}
			columns={columns}
		/>
	);
};

export default VouchersList;
