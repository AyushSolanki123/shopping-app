import axios from "axios";
import env from "./ApiEnv";

export function registerUser(register) {
    return new Promise(function (resolve, reject) {
        axios({
            method: 'POST',
            url: env.baseUrl + env.register,
            data: register
        })
            .then((response) => {
                resolve(response)
            })         
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export function loginUser(login) {
    return new Promise(function (resolve, reject) {
        axios({
            method: 'POST',
            url: env.baseUrl + env.login,
            data: login
        })
            .then((response) => {
                if (response) {
                    localStorage.setItem('tokenPair', JSON.stringify(response.data.token))
                    resolve({loginDone: true})
                }
                else
                    throw new Error("Login failed")
            })         
            .catch((error) => {
                reject(error)
            })
    })
}

export function logOut() {
    return new Promise(function (resolve, reject) {
        localStorage.removeItem("tokenPair")
        resolve()
    })
}

export function getAllProducts() {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'GET',
            url: env.baseUrl + env.getAllProducts
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getProduct(productId) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'GET',
            url: env.baseUrl + env.getProduct.replace('{productId}', productId),            
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function createProduct(reqBody) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'POST',
            url: env.baseUrl + env.createProduct,            
            data: reqBody
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function updateProduct(productId, reqBody) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'PUT',
            url: env.baseUrl + env.updateProduct.replace('{productId}', productId),            
            data: reqBody
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function deleteProduct(productId) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'DELETE',
            url: env.baseUrl + env.deleteProduct.replace('{productId}', productId)
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function listCategories() {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'GET',
            url: env.baseUrl + env.listCategories
        })
            .then((response) => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function searchProduct(productName) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'GET',
            url: env.baseUrl + env.searchProduct.replace('{productName}', productName)
        })
            .then((response) => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function filterProduct(category) {
    return new Promise(function (resolve, reject) {
        apiActionWithToken({
            method: 'GET',
            url: env.baseUrl + env.filterProduct.replace('{categoryId}', category)
        })
            .then((response) => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


// Helper functions
function apiActionWithToken(options) {
    return new Promise(function (resolve, reject) {
        let authToken = null;
        let refreshToken = null;
        var tokenPair = JSON.parse(localStorage.getItem('tokenPair'))
        if (tokenPair && tokenPair.authToken && tokenPair.refreshToken) {
            authToken = tokenPair.authToken;
            refreshToken = tokenPair.refreshToken;
            options.headers = {...options.headers, authorization: authToken};
            axios(options)
                .then(apiResponse => {
                    resolve(apiResponse);
                })
                .catch(error => {
                    console.log("ereor", error)
                    if (error?.response?.status === 401) {
                        refreshJWT(refreshToken)
                            .then(() => {
                                apiActionWithToken(options);
                            })
                            .catch(error => {
                                console.log("eror", error)
                                reject(error);
                            });
                    } else {
                        reject(error);
                    }
                });
        } else {
            reject('Unable to get the token pair');
        }        
    });
}
  
function refreshJWT(refreshToken) {
    return new Promise(function (resolve, reject) {
        axios
        .post(env.baseUrl + env.refreshToken, {
            refreshToken: refreshToken,
        })
        .then(apiResponse => {
            if (apiResponse.status >= 200 && apiResponse.status <= 209) {
                let tokenPair = {
                    authToken: apiResponse.data.authToken,
                    refreshToken: refreshToken,
                };
                localStorage.setItem('tokenPair', JSON.stringify(tokenPair))  
                resolve()
            } else {
                reject('Unable to refresh the token at the moment');
            }
        })
        .catch(error => {
            console.log(error);
            reject('Unable to refresh the token at the moment');
            logOut()
        });
    });
}