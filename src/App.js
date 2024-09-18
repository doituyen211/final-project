// App.js
import React from 'react';
import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBarLayout from "./layouts/components/SideBarLayout";
import {LoginComponent} from "./pages";
import HeaderLayout from "./layouts/components/HeaderLayout";
import FooterLayout from "./layouts/components/FooterLayout";

function App() {
    return (
        <BrowserRouter>
            <LayoutDefault>
                <Routes>
                    <Route path="/login1" element={<LoginComponent/>}/>
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
                                    element={
                                        <>
                                            <HeaderLayout></HeaderLayout>
                                            <SideBarLayout></SideBarLayout>
                                            <div className="content-wrapper">
                                                <ChildComponent/>
                                            </div>
                                            <FooterLayout></FooterLayout>
                                            <aside className="control-sidebar control-sidebar-dark"></aside>
                                        </>
                                    }
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
