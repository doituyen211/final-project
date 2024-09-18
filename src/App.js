// App.js
import React from 'react';
import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginComponent} from "./pages";
import NotFoundComponent from "./pages/NotFoundComponent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route for Login page, no LayoutDefault */}
                <Route path="/login" element={<LoginComponent/>}/>

                {/* Routes wrapped in LayoutDefault */}
                <Route element={<LayoutDefault/>}>
                    {routeSideBar.map((item, index) => {
                        const Component = item.component;
                        if (item.child.length <= 0) {
                            return <Route key={index} path={item.to} element={<Component/>}/>;
                        }

                        return item.child.map((subItem, subIndex) => {
                            const ChildComponent = subItem.component;
                            return (
                                <Route
                                    key={`${index}-${subIndex}`}
                                    path={subItem.to}
                                    element={<ChildComponent/>}
                                />
                            );
                        });
                    })}
                </Route>
                <Route path="*" element={<NotFoundComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
