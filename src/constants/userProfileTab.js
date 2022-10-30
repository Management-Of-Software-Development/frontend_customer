import ChangeInformation from "../components/UserProfileTabs/ChangeInformation";
import ChangePassword from "../components/UserProfileTabs/ChangePassword";

export const userProfileTab = [
	{
		text: "Change user information",
		content: <ChangeInformation />,
	},
	{
		text: "Change password",
		content: <ChangePassword />,
	},
];
