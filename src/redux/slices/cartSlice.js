import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter({
	selectId: (product) => product._id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = productsAdapter.getInitialState({});

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addProduct: (state, action) => {
			const existingProduct = state.entities[action.payload._id];
			if (existingProduct) {
				existingProduct.quantity += 1;
			} else {
				productsAdapter.addOne(state, {
					...action.payload,
					price: action.payload.price,
				});
			}
		},
		removeProduct: (state, action) => {
			const existingProduct = state.entities[action.payload._id];
			if (existingProduct) {
				if (existingProduct.quantity > 1) {
					existingProduct.quantity -= 1;
				} else {
					productsAdapter.removeOne(state, action.payload._id);
				}
			}
		},
		removeAllProduct: (state, action) => {
			// const existingProduct = state.entities[action.payload._id];
			// if (existingProduct) {
			productsAdapter.removeAll(state);
			// }
		},
		removeIndividualProduct: (state, action) => {
			const existingProduct = state.entities[action.payload._id];
			if (existingProduct) {
				if (existingProduct.quantity > 1) {
					existingProduct.quantity = 0;
				} else {
					productsAdapter.removeOne(state, action.payload._id);
				}
			}
		},
	},
});
export const {
	addProduct,
	removeProduct,
	removeAllProduct,
	removeIndividualProduct,
} = cartSlice.actions;

export const {
	selectById: selectProductById,
	selectIds: selectProductIds,
	selectEntities: selectProductEntities,
	selectAll: selectAllProducts,
	selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.cart);

export default cartSlice.reducer;
