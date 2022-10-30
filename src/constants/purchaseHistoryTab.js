import ConfirmedOrders from "../components/PurchaseHistoryTabs/ConfirmedOrders";
import DeliveredOrders from "../components/PurchaseHistoryTabs/DeliveredOrders";
import OpenOrders from "../components/PurchaseHistoryTabs/OpenOrders";
import CancelledOrders from "../components/PurchaseHistoryTabs/CancelledOrders";

export const purchaseHistoryTab = [
	{
		tab: "OPEN",
		content: <OpenOrders />,
	},
	{
		tab: "CONFIRMED",
		content: <ConfirmedOrders />,
	},
	{
		tab: "DELIVERED",
		content: <DeliveredOrders />,
	},
	{
		tab: "CANCELLED",
		content: <CancelledOrders />,
	},
];

export const purchaseHistoryTabStyle = {
	width: "100%",
	color: "black",
	minHeight: "300px",
};
