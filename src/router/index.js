import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import AdminLayout from "../layout/AdminLayout";
import CreateCategory from "../pages/admin/category/CreateCategory";
import Categories from "../pages/admin/category/Categories";
import EditCategory from "../pages/admin/category/EditCategory";
import CreateProduct from "../pages/admin/product/CreateProduct";
import Products from "../pages/admin/product/Products";
import EditProduct from "../pages/admin/product/EditProduct";

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
                    <CreateProduct />
                </AdminLayout>
            }/>
            <Route path="/admin/products" element={
                <AdminLayout>
                    <Products />
                </AdminLayout>
            }/>
            <Route path="/admin/product/edit/:id" element={
                <AdminLayout>
                    <EditProduct />
                </AdminLayout>
            }/>
        </>
    )
);