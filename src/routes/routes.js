import { Route, BrowserRouter, Routes } from "react-router-dom";

import { Dashboard } from './../pages/dashboard/index'
import { Context } from './../pages/contextteste/index'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Dashboard/>} path="/context" exact/>
                <Route element={<Context/>} path="/" exact/>
                <Route element={<Dashboard/>} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;

