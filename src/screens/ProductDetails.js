/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { IconButton } from "@mui/material";
import { Card, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import ProductDetail from "../components/Product/ProductDetail";
import DeleteProductDialog from "../components/Product/DeleteProductDialog";
import EditProductDialog from "../components/Product/EditProductDialog";
import "../css/ProductDetails.css";
import {
	deleteProduct,
	getProduct,
	listCategories,
	logOut,
	updateProduct,
} from "../utils/ApiActions";
import { connect } from "react-redux";
import {
	fetchProductAction,
	deleteProductAction,
	editProductAction,
} from "../store/Actions";

const mapStateToProps = (state) => {
	return {
		products: state.product,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProductAction: (payload) => dispatch(fetchProductAction(payload)),
		editProductAction: (payload) => dispatch(editProductAction(payload)),
		deleteProductAction: (payload) =>
			dispatch(deleteProductAction(payload)),
	};
};
class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			loading: true,
			navigate: false, // Flag to handle back button
			showDeleteDialog: false, // Flag to show delete product dialog
			showEditDialog: false, // Flag to show edit product dialog
			product: {},
			categories: [],
			isLoggedIn: true,
		};
		this.logout = this.logout.bind(this);
	}

	// Get the product details from api whose id is stored in localstorage
	componentDidMount() {
		const { fetchProductAction } = this.props;
		const id = localStorage.getItem("productId");
		getProduct(id)
			.then((response) => {
				fetchProductAction(response.data);
				this.setState({
					id: id,
					product: response.data,
				});
				return listCategories();
			})
			.then((response) => {
				this.setState({
					categories: response.data,
					loading: false,
				});
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log(err);
			});
	}

	// Navigate back to home page and delete the current product id from localstorage
	backToHome() {
		localStorage.removeItem("productId");
		this.setState({
			navigate: true,
		});
	}

	// Delete the product from the api
	deleteProductHandler() {
		const { deleteProductAction } = this.props;
		this.setState({ showDeleteDialog: false });
		deleteProduct(this.state.id)
			.then((response) => {
				deleteProductAction(response);
				console.log(response);
				this.backToHome();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Edit the product from the api and set the edited value on the frontend
	editProductHandler(product) {
		const { editProductAction } = this.props;
		this.setState({ showEditDialog: false });
		updateProduct(this.state.id, product)
			.then((response) => {
				editProductAction(response.data);
				this.setState({ product: response.data });
			})
			.catch((err) => console.log(err));
	}

	logout() {
		logOut()
			.then((response) => {
				this.setState({ isLoggedIn: false });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<React.Fragment>
				{!this.state.isLoggedIn && (
					<Navigate to="/auth" replace={true} />
				)}
				{this.state.isLoggedIn && (
					<React.Fragment>
						{/* Navigation bar */}
						<NavBar logout={this.logout} />
						{/* Loading State while page get product from api */}
						{this.state.loading && <Loading />}
						{!this.state.loading && (
							<React.Fragment>
								{/* Delete product dialog which contains buttons to delete product */}
								<DeleteProductDialog
									showModal={this.state.showDeleteDialog}
									closeModal={() =>
										this.setState({
											showDeleteDialog: false,
										})
									}
									deleteProduct={() =>
										this.deleteProductHandler()
									}
								/>
								{/* Edit product dialog which conatins form and emits the data */}
								<EditProductDialog
									categories={this.state.categories}
									product={this.state.product}
									showModal={this.state.showEditDialog}
									closeModal={() =>
										this.setState({ showEditDialog: false })
									}
									editProduct={(product) =>
										this.editProductHandler(product)
									}
								/>
								{this.state.navigate && (
									// component that navigates back to home page
									<Navigate to="/" replace={true} />
								)}
								{!this.state.navigate && (
									// Main page
									<div className="body">
										<Card className="row main-card">
											<Row>
												{/* back button to navigate back to home page */}
												<Col xs={1}>
													<IconButton
														aria-label="back"
														onClick={() =>
															this.backToHome()
														}
													>
														<ArrowBackIosNewIcon />
													</IconButton>
												</Col>
												{/* Component to render product image */}
												<Col className="image" xs={4}>
													<img
														src={
															this.state.product
																.imageUrl
														}
														alt="Product Image"
														className="product-image"
													/>
												</Col>
												{/* Component that renders all product details and contains edit and delete button */}
												<ProductDetail
													product={this.state.product}
													showDelete={() =>
														this.setState({
															showDeleteDialog: true,
														})
													}
													showEdit={() =>
														this.setState({
															showEditDialog: true,
														})
													}
												/>
											</Row>
										</Card>
									</div>
								)}
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
