const post = (url, data) => {
	return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.status >= 400 && res.status < 600) {
			throw new Error("Bad response from server");
		}
		return res.json();
	});
};

const get = (url) => {
	return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.status >= 400 && res.status < 600) {
			throw new Error("Bad response from server");
		}
		return res.json();
	});
};

const fetchWrapper = {
	post,
	get,
};

export default fetchWrapper;
