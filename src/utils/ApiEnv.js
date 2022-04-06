const env = {
    baseUrl: 'http://localhost:3000/api',
    login: '/user/login',
    register: '/user/register',
    refreshToken: '/user/refreshToken',
    getAllProducts: '/product',
    getProduct: '/product/get/{productId}',
    createProduct: '/product',
    updateProduct: '/product/{productId}',
    deleteProduct: '/product/{productId}',
    searchProduct: '/product/search/{productName}',
    filterProduct: '/product/filter/{categoryId}',
    listCategories: '/product/category'
}

export default env;