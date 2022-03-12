import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from './store/reducers';
import thunk from 'redux-thunk';
import ErrorBoundary from "./components/ErrorBoundary";

const store = createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
)
;