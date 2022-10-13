import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	SET_PRODUCT,
	SET_PRODUCTS,
} from "./ActionTypes";

export function fetchProductsAction(payload) {
	return {
		type: SET_PRODUCTS,
		payload: payload,
	};
}

export function fetchProductAction(payload) {
	return {
		type: SET_PRODUCT,
		payload: payload,
	};
}

export function addProductsAction(payload) {
	return {
		type: ADD_PRODUCT,
		payload: payload,
	};
}

export function editProductAction(payload) {
	return {
		type: EDIT_PRODUCT,
		payload: payload,
	};
}

export function deleteProductAction(payload) {
	return {
		type: DELETE_PRODUCT,
		payload: payload,
	};
}
