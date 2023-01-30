import React, {Component} from 'react';

import {createStore} from 'redux';

import {Provider} from 'react-redux';
import expressionReducer from "./calculator/reducers/expression"
import Calculator from "./calculator/components/calculator";

const store = createStore(expressionReducer);
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Calculator/>
            </Provider>
        );
    }
}



export default App;

