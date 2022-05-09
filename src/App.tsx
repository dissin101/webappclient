import React, {useEffect} from 'react';
import './App.scss';
import Navigation from "./components/Navigation";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Product from "./components/pages/Catalog/ProductOutput";
import Cart from './components/pages/Cart';
import Auth from "./components/pages/Auth";
import BrandsOutput from "./components/pages/Catalog/BrandsOutput";
import ModelsOutput from "./components/pages/Catalog/ModelsOutput";
import CategoriesOutput from "./components/pages/Catalog/CategoriesOutput";
import ProductsOutput from "./components/pages/Catalog/ProductsOutput";
import {getUserToken} from "./utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {checkUser} from "./store/actions/auth";
import {RootState} from "./index";
import Profile from "./components/pages/Profile";


const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = getUserToken();

        if (token !== null) {
            dispatch(checkUser(token));
        }
    }, []);

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    return (
        <BrowserRouter>
            <Navigation/>
            <div className={'m-t-16 container'}>
                <Routes>
                    {isAuth &&
                        <Route
                            path={"/profile"}
                            element={<Profile/>}
                        />
                    }
                    <Route
                        path={"/"}
                        element={<BrandsOutput/>}
                    />
                    <Route
                        path={"/models"}
                        element={<ModelsOutput/>}
                    />
                    <Route
                        path={"/categories"}
                        element={<CategoriesOutput/>}
                    />
                    <Route
                        path={"/products"}
                        element={<ProductsOutput/>}
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
                        element={<Navigate to="/"/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
