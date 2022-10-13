import React, { Component } from "react";
import FilterProducts from "../components/Home/FilterProducts";
import NavBar from "../components/NavBar";
import ProductList from "../components/Home/ProductList";
import SearchProducts from "../components/Home/SearchProducts";
import AddProductDialog from "../components/Home/AddProductDialog";
import Loading from "../components/Loading";
import capitalize from "../utils/CapitalizeText";
import "../css/Home.css";
import { connect } from "react-redux";
import { fetchProductsAction, addProductsAction } from "../store/Actions";
import {
	createProduct,
	filterProduct,
	getAllProducts,
	listCategories,
	logOut,
	searchProduct,
} from "../utils/ApiActions";
import { Navigate } from "react-router";

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProducts: (payload) => dispatch(fetchProductsAction(payload)),
		addProducts: (payload) => dispatch(addProductsAction(payload)),
	};
};
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			filteredProducts: [],
			loading: true, // flag to check loading state
			search: "",
			currentFilter: "All",
			showAddProductDialog: false, // Flag to show modal
			categories: [],
			isLoggedIn: true,
		};
		this.setFilter = this.setFilter.bind(this);
		this.searchProducts = this.searchProducts.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.logout = this.logout.bind(this);
	}

	// GET call to API to get all products
	componentDidMount() {
		const { fetchProducts } = this.props;
		console.log(this.props);
		getAllProducts()
			.then((response) => {
				fetchProducts(response.data);
				this.setState({
					products: response.data,
					filteredProducts: response.data,
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

	// Filter products based on Category
	setFilter(value) {
		this.setState({ loading: true });
		if (value === "All") {
			this.setState({
				currentFilter: value,
				filteredProducts: this.state.products,
				loading: false,
			});
		} else {
			filterProduct(value)
				.then((response) => {
					this.setState({
						currentFilter: capitalize(response.data.category),
						filteredProducts: response.data.data,
						loading: false,
					});
				})
				.catch((err) => {
					this.setState({ loading: false });
					console.log(err);
				});
		}
	}

	// Filter products based on search field
	searchProducts() {
		searchProduct(this.state.search.toLowerCase())
			.then((response) => {
				this.setState({
					filteredProducts: response.data.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// POST request to API to create a product and returned product is push to array
	addProduct(product) {
		const { addProducts } = this.props;
		console.log(product);
		createProduct(product)
			.then((response) => {
				response.data.rating = product.rating;
				addProducts(response.data);
				this.setState({
					products: [response.data.data, ...this.state.products],
					filteredProducts: [
						response.data.data,
						...this.state.filteredProducts,
					],
					showAddProductDialog: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
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
						{/* Navigation Bar */}
						<NavBar logout={this.logout} />
						{this.state.loading && (
							// Loading state while App waits for GET call
							<Loading />
						)}
						{!this.state.loading && (
							<React.Fragment>
								{/* Add Product Dialog which contains form and emits the data */}
								<AddProductDialog
									categories={this.state.categories}
									showModal={this.state.showAddProductDialog}
									addProduct={this.addProduct}
									closeModal={() =>
										this.setState({
											showAddProductDialog: false,
										})
									}
								/>
								<div className="home">
									<div className="search">
										{/* Filter Products based on search results */}
										<SearchProducts
											handleSearchChange={(search) =>
												this.setState({
													search: search,
												})
											}
											searchProducts={this.searchProducts}
										/>
									</div>
									<div className="category-filter">
										{/* Filter Products based on Category selected */}
										<FilterProducts
											categories={this.state.categories}
											currentFilter={
												this.state.currentFilter
											}
											setFilter={this.setFilter}
											handleAddProduct={() =>
												this.setState({
													showAddProductDialog: true,
												})
											}
										/>
									</div>
									<div className="productList">
										{/* List Filtered Products */}
										<ProductList
											products={
												this.state.filteredProducts
											}
										/>
									</div>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
