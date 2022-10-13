import reducer from "./Reducer";
const redux = require("redux");
const createStore = redux.createStore;

const store = createStore(reducer);

export default store;
