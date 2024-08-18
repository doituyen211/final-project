// App.js
import React from 'react';
import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <LayoutDefault>
                <Routes>
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
                </Routes>
            </LayoutDefault>
        </BrowserRouter>
    );
}


export default App;
