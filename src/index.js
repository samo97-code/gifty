import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store'
import {router} from "./router";
import {RouterProvider} from "react-router";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
);

reportWebVitals();

