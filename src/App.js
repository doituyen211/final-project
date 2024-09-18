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
import PrivateRoute from "./route/PrivateRoute";
import NotFoundComponent from "./pages/NotFoundComponent";

function App() {
    return (
        <BrowserRouter>
            <LayoutDefault>
                <Routes>
                    <Route path="/login" element={<LoginComponent/>}/>
                    {routeSideBar.map((item, index) => {
                        const Component = item.component;
                        if (item.child.length <= 0) {
                            return <Route key={index} path={item.to} element={
                                <>
                                    <HeaderLayout></HeaderLayout>
                                    <SideBarLayout></SideBarLayout>
                                    <div className="content-wrapper">
                                        <Component/>
                                    </div>
                                    <FooterLayout></FooterLayout>
                                    <aside className="control-sidebar control-sidebar-dark"></aside>
                                </>
                            }/>;
                        }

                        return item.child.map((subItem, subIndex) => {
                            const ChildComponent = subItem.component;
                            return (
                                <Route
                                    key={`${index}-${subIndex}`}
                                    path={subItem.to}
                                    element={
                                        <>
                                            <PrivateRoute>
                                                <HeaderLayout></HeaderLayout>
                                                <SideBarLayout></SideBarLayout>
                                                <div className="content-wrapper">
                                                    <subItem.component/>
                                                </div>
                                                <FooterLayout></FooterLayout>
                                                <aside className="control-sidebar control-sidebar-dark"></aside>
                                            </PrivateRoute>
                                        </>
                                    }
                                />
                            );
                        });
                    })}
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Routes>
            </LayoutDefault>
        </BrowserRouter>
    );
}


export default App;
