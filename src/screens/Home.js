import React, { Component } from 'react';
import FilterProducts from '../components/Home/FilterProducts';
import NavBar from '../components/NavBar';
import ProductList from '../components/Home/ProductList';
import SearchProducts from '../components/Home/SearchProducts';
import AddProductDialog from '../components/Home/AddProductDialog';
import Loading from '../components/Loading';
import axios from 'axios';
import '../css/Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            loading: true, // flag to check loading state
            search: "",
            currentFilter: 'All',
            showAddProductDialog: false, // Flag to show modal
        }
        this.setFilter = this.setFilter.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    // GET call to API to get all products
    componentDidMount() {
        axios.get('https://fakestoreapi.com/products')
            .then((response)=>{
                this.setState({
                    products: response.data,
                    filteredProducts: response.data,
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Filter products based on Category
    setFilter(value) {       
        if (value === "All") {
            this.setState({
                currentFilter: value,
                filteredProducts: this.state.products
            });
        } else {
            let filteredProducts = this.state.products.filter(product => {
                return product.category === value.toLowerCase()
            });
            this.setState({
                currentFilter: value,
                filteredProducts: filteredProducts
            });
        }
    }

    // Filter products based on search field
    searchProducts() {
        let filteredProducts = this.state.products.filter(product => {
            return product.title.toLowerCase().match(this.state.search.toLowerCase());
        });
        this.setState({
            filteredProducts: filteredProducts
        });
    }

    // POST request to API to create a product and returned product is push to array
    addProduct(product) {
        var id = this.state.products.length;
        product = Object.assign(product, { id: id + 1 })
        axios.post('https://fakestoreapi.com/products', product)
            .then((response) => {
                response.data.rating = product.rating;
                this.setState({
                    products: [response.data, ...this.state.products],
                    filteredProducts: [response.data, ...this.state.filteredProducts ],
                    showAddProductDialog: false
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                {/* Navigation Bar */}
                <NavBar />
                {this.state.loading && 
                    // Loading state while App waits for GET call
                    <Loading />
                }
                {!this.state.loading && 
                    <React.Fragment>          
                        {/* Add Product Dialog which contains form and emits the data */}
                        <AddProductDialog
                            showModal={this.state.showAddProductDialog}
                            addProduct={this.addProduct}
                            closeModal={() => this.setState({ showAddProductDialog: false })}
                        />              
                        <div className='home'>
                            <div className='search'>
                                {/* Filter Products based on search results */}
                                <SearchProducts
                                    handleSearchChange={(search) => this.setState({search: search})}
                                    searchProducts={this.searchProducts}
                                />
                            </div>
                            <div className='category-filter'>              
                                {/* Filter Products based on Category selected */}
                                <FilterProducts
                                    currentFilter={this.state.currentFilter}
                                    setFilter={this.setFilter}
                                    handleAddProduct={() => this.setState({ showAddProductDialog: true })}
                                />                                        
                            </div>
                            <div className='productList'>
                                {/* List Filtered Products */}
                                <ProductList products={this.state.filteredProducts} />
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }    
}

export default Home;