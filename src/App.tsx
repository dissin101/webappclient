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


const App = () => (
    <>
        <Navigation/>
        <div className={'m-t-16 container'}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={"/"}
                        element={<Catalog/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    </>
);

export default App;
