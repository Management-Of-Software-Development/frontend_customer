import React from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Favourite from "../components/Favourite";
import Aroma from "../components/Aroma";

const Home = () => {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Slider />
			<Products />
			<Favourite />
			<Aroma />
			<Categories />
		</div>
	);
};

export default Home;
