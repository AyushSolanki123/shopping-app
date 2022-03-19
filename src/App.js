import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './css/App.css';
import Auth from './screens/Auth';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route exact path="/auth" element={<Auth />} />
                    {/* Home Screen which list the products and can add the product */}
                    <Route exact path="/" element={<Home />} />
                    {/* Product Details Screen which shows details of a single product can edit and delete that product*/}
                    <Route exact path="/product" element={<ProductDetails />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;