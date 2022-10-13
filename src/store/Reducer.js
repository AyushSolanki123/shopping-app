import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	SET_PRODUCT,
	SET_PRODUCTS,
} from "./ActionTypes";

const initialState = {
	products: [],
	product: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case SET_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case ADD_PRODUCT:
			return {
				...state,
				products: [action.payload, ...state.products],
			};
		case EDIT_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: {},
			};
		default:
			return state;
	}
};

export default reducer;
