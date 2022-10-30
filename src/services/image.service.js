import { storage } from "../firebase";
import { notification } from "antd";
export const uploadImage = (filename, file, func) => {
	const uploadTask = storage.ref(`images/${filename}`).put(file);
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			if (progress == 100) {
				notification.success({
					message: `Notification`,
					description: "Add avatar successfully!",
					placement: `bottomRight`,
					duration: 1.5,
				});
			}
		},
		(error) => {
			console.log(error);
		},
		() => {
			storage
				.ref("images")
				.child(filename)
				.getDownloadURL()
				.then((url) => {
					localStorage.setItem("avatar", url);
					func(url);
				});
		}
	);
};
