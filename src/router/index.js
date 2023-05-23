import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import AdminLayout from "../layout/AdminLayout";
import CreateCategory from "../pages/category/CreateCategory";
import Categories from "../pages/category/Categories";
import EditCategory from "../pages/category/EditCategory";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={
                <h1>Login</h1>
            }/>
            <Route path="/admin" element={
                <AdminLayout>
                    <App/>
                </AdminLayout>
            }/>
            <Route path="/admin/category/create" element={
                <AdminLayout>
                    <CreateCategory />
                </AdminLayout>
            }/>
            <Route path="/admin/categories" element={
                <AdminLayout>
                    <Categories />
                </AdminLayout>
            }/>
            <Route path="/admin/category/edit/:id" element={
                <AdminLayout>
                    <EditCategory />
                </AdminLayout>
            }/>
            <Route path="/admin/product/create" element={
                <AdminLayout>
                    <h1>Test</h1>
                </AdminLayout>
            }/>
            <Route path="/admin/products" element={
                <AdminLayout>
                    <h1>Test</h1>
                </AdminLayout>
            }/>
            <Route path="/admin/product/edit/:id" element={
                <AdminLayout>
                    <h1>Test</h1>
                </AdminLayout>
            }/>

        </>
    )
);