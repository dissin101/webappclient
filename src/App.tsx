import React from 'react';
import './App.scss';
import Navigation from "./components/Navigation";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";


const App = () => (
    <>
        <Navigation/>
        <div className={'m-t-16 container'}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={"/"}
                        element={<HomePage/>}
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
