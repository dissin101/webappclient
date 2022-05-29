import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from './store/reducers';
import thunk from 'redux-thunk';
import ErrorBoundary from "./components/ErrorBoundary";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);