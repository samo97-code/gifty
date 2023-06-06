import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CreateCategory from "../pages/admin/category/CreateCategory";
import Categories from "../pages/admin/category/Categories";
import EditCategory from "../pages/admin/category/EditCategory";
import CreateProduct from "../pages/admin/product/CreateProduct";
import Products from "../pages/admin/product/Products";
import EditProduct from "../pages/admin/product/EditProduct";
import Login from "../pages/login/Login";
import Dashboard from "../pages/admin/Dashboard";
import CreateAds from "../pages/admin/ads/CreateAds";
import Ads from "../pages/admin/ads/Ads";
import EditAds from "../pages/admin/ads/EditAds";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={
                <Login/>
            }/>
            <Route path="/admin/"  element={
                <AdminLayout>
                    <Dashboard/>
                </AdminLayout>
            }/>
            <Route path="/admin/category/create/" end element={
                <AdminLayout>
                    <CreateCategory/>
                </AdminLayout>
            }/>
            <Route path="/admin/categories/" element={
                <AdminLayout>
                    <Categories/>
                </AdminLayout>
            }/>
            <Route path="/admin/category/edit/:id/" element={
                <AdminLayout>
                    <EditCategory/>
                </AdminLayout>
            }/>
            <Route path="/admin/ads/create/" end element={
                <AdminLayout>
                    <CreateAds/>
                </AdminLayout>
            }/>
            <Route path="/admin/ads/" element={
                <AdminLayout>
                    <Ads/>
                </AdminLayout>
            }/>
            <Route path="/admin/ads/edit/:id/" element={
                <AdminLayout>
                    <EditAds/>
                </AdminLayout>
            }/>
            <Route path="/admin/product/create/" element={
                <AdminLayout>
                    <CreateProduct/>
                </AdminLayout>
            }/>
            <Route path="/admin/products/" element={
                <AdminLayout>
                    <Products/>
                </AdminLayout>
            }/>
            <Route path="/admin/product/edit/:id/" element={
                <AdminLayout>
                    <EditProduct/>
                </AdminLayout>
            }/>
        </>
    )
);