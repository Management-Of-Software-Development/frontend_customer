import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Loading from "./components/common/Loading";
import ScrollTop from "./components/ScrollTop";
import Login from "./pages/Login";

const Home = React.lazy(() => import("./pages/Home"));
const Cart = React.lazy(() => import("./pages/Cart"));
const ProductList = React.lazy(() => import("./pages/ProductList"));
const AppreciationProductList = React.lazy(() =>
	import("./pages/AppreciationProductList")
);
const Announcement = React.lazy(() => import("./components/Announcement"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const AppreciationProductPage = React.lazy(() =>
	import("./pages/AppreciationProductPage")
);
const Footer = React.lazy(() => import("./components/Footer"));
const PurchasingHistory = React.lazy(() => import("./pages/PurchasingHistory"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const User = React.lazy(() => import("./pages/User"));
const Register = React.lazy(() => import("./pages/Register"));
const Logout = React.lazy(() => import("./pages/Logout"));
const SuccessResetPassword = React.lazy(() =>
	import("./pages/SuccessResetPassword")
);
const SuccessRegister = React.lazy(() => import("./pages/SuccessRegister.jsx"));
const SuccessRequestPassword = React.lazy(() =>
	import("./pages/SuccessRequestPassword.jsx")
);
const SuccessConfirmEmail = React.lazy(() =>
	import("./pages/SuccessConfirmEmail")
);
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ConfirmRegister = React.lazy(() => import("./pages/ConfirmRegister"));
const ConfirmForgotPassword = React.lazy(() =>
	import("./pages/ConfirmForgotPassword")
);
const VouchersList = React.lazy(() => import("./pages/VouchersList"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const AddressList = React.lazy(() => import("./pages/AddressList"));

const App = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Navbar />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Announcement />} path="/annoucement" />
					<Route element={<Home />} path="/" />
					<Route
						element={<ProductList title="All Products" />}
						path="/products"
					/>
					<Route
						element={
							<AppreciationProductList title="All Products" />
						}
						path="/appreciation-products"
					/>
					<Route element={<ProductPage />} path="/product/:id" />
					<Route
						element={<AppreciationProductPage />}
						path="/appreciation-product/:id"
					/>
					<Route element={<Cart />} path="/cart" />
					<Route element={<PurchasingHistory />} path="/history" />
					<Route element={<OrderPage />} path="/order/:id" />
					<Route element={<User />} path="/profile" />
					<Route element={<EditProfile />} path="/edit-profile" />
					<Route
						element={<SuccessResetPassword />}
						path="/reset-password-successfully"
					/>
					<Route
						element={<SuccessConfirmEmail />}
						path="/confirm-email-successfully"
					/>
					<Route
						element={<SuccessRegister />}
						path="/register-successfully"
					/>
					<Route
						element={<SuccessRequestPassword />}
						path="/request-password-successfully"
					/>
					<Route
						element={<ForgotPassword />}
						path="/forgot-password"
					/>
					<Route
						element={<ResetPassword />}
						path="/reset-password/:token"
					/>
					<Route element={<Register />} path="/register" />
					<Route element={<Login />} path="/login" />
					<Route element={<Logout />} path="/logout" />
					<Route
						element={<ConfirmRegister />}
						path="/user/register/verify/:token"
					/>
					<Route
						element={<ConfirmForgotPassword />}
						path="/account/forgot-password/verify/:token"
					/>
					<Route element={<VouchersList />} path="/vouchers-list" />
					<Route element={<AddressList />} path="/address-list" />
				</Routes>
				<ScrollTop />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<Footer />
			</Suspense>
		</>
	);
};

export default App;
