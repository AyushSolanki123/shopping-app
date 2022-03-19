const env = {
    baseUrl: 'http://localhost:3000/api',
    login: '/user/login',
    register: '/user/register',
    refreshToken: '/user/refreshToken',
    getAllProducts: '/product',
    getProduct: '/product/{productId}',
    createProduct: '/product',
    updateProduct: '/product/{productId}',
    deleteProduct: '/product/{productId}',
    searchProduct: '/product/search',
    filterProduct: '/product/filter'
}

export default env;