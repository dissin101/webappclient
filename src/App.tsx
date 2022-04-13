import React from 'react';
import './App.scss';
import Navigation from "./components/Navigation";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Catalog from "./components/pages/Catalog";
import Product from "./components/pages/Product";
import Cart from './components/pages/Cart';
import Auth from "./components/pages/Auth";


const App = () => (
    <BrowserRouter>
        <Navigation/>
        <div className={'m-t-16 container'}>
            <Routes>
                <Route
                    path={"/"}
                    element={<Catalog/>}
                />
                <Route
                    path={"/product/:id"}
                    element={<Product/>}
                />
                <Route
                    path={"/cart"}
                    element={<Cart/>}
                />
                <Route
                    path={"/auth"}
                    element={<Auth/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;
