import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {fetchCategories} from "../../../store/category";
import cogoToast from "cogo-toast";
import {catchErrors} from "../../../utils";
import {sizes, shops, statuses} from "../../../constants";
import {createProduct} from "../../../store/product";
import {useNavigate} from "react-router";

const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const {register, handleSubmit, reset, watch, setValue, formState: {errors}} = useForm();

    const watchCategory = watch("category");

    useEffect(() => {
        setDefaultValues()
        fetchAllCategories()
    }, [])

    const setDefaultValues = () => {
        setValue('shipmentPrice', 0)
        setValue('quantity', 1)
        setValue('giftyPrice', 0)
    }

    const fetchAllCategories = async () => {
        try {
            const resp = await dispatch(fetchCategories())
            if (resp.data) {
                setCategories(resp.data)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            let cleanIncome = 0
            const shopPriceArm = data.shopPrice * data.dollarRate

            if (data.giftyPrice && data.shipmentPrice) {
                cleanIncome = +data.giftyPrice - +data.shipmentPrice - +shopPriceArm
            }

            data.category = categories.find((item) => item.name === data.category)
            if (data.size) data.size = sizes.find((item) => item.id === data.size)

            const prepareData = {
                ...data,
                id: uuidv4(),
                status: data.arrivedDate ? statuses[1] : statuses[0],
                isInStock: true,
                shopPriceArm,
                cleanIncome
            }

            // console.log(prepareData,'prepareData')
            // return

            const resp = await dispatch(createProduct(prepareData))
            if (resp.status === 201) {
                await reset()
                await cogoToast.success('Successfully Created')
                await navigate('/admin/products')
            }
        } catch (e) {
            catchErrors(e)
        }
    };

    return (
        <div className="main-container">
            <h2 className="text-primary-900 text-3xl font-bold mb-6">Create Product</h2>

            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[500px] mx-auto border border-gray-400 rounded-[4px] shadow-md px-4 py-5">

                <div className="form-group mb-4">
                    <label htmlFor="title" className="block mb-1 text-primary-100 text-lg font-semibold">Title</label>
                    <input id="title" name="title"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Title" type="text" {...register('title', {required: true})}/>

                    {errors.title ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="brand" className="block mb-1 text-primary-100 text-lg font-semibold">Brand</label>
                    <input id="brand" name="brand"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Brand" type="text" {...register('brand', {required: true})}/>

                    {errors.brand ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="productUrl" className="block mb-1 text-primary-100 text-lg font-semibold">Product
                        Url</label>
                    <input id="productUrl" name="productUrl"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Product Url" type="text" {...register('productUrl')}/>

                    {errors.productUrl ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="shop"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Shop</label>
                    <select name="shop" id="shop" {...register('shop')}
                            className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100">
                        <option value={null}>None</option>
                        {
                            shops.map((shop) => {
                                return <option value={shop.name} key={shop.id}>{shop.name}</option>
                            })
                        }
                    </select>

                    {errors.shop ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                {
                    !loading ? <div className="form-group mb-4">
                        <label htmlFor="category"
                               className="block mb-1 text-primary-100 text-lg font-semibold">Category</label>
                        <select name="category" id="category" {...register('category', {required: true})}
                                className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100">
                            {
                                categories.map((category) => {
                                    return <option value={category.name} key={category.name}>{category.name}</option>
                                })
                            }

                        </select>

                        {errors.category ?
                            <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}

                    </div> : null
                }

                {
                    watchCategory === 'fragrances' ?
                        <div className="form-group mb-4">
                            <label htmlFor="size"
                                   className="block mb-1 text-primary-100 text-lg font-semibold">Size</label>
                            <select name="size" id="size" {...register('size')}
                                    className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100">
                                <option value={null}>None</option>
                                {
                                    sizes.map((size) => {
                                        return <option value={size.id} key={size.id}>{size.name}</option>
                                    })
                                }
                            </select>

                            {errors.size ?
                                <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                        </div> : null
                }

                <div className="form-group mb-4">
                    <label htmlFor="quantity"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Quantity</label>
                    <input type="number" name="quantity" id="quantity"
                           placeholder="Quantity" {...register('quantity', {required: true})}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.quantity ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="shopPrice"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Shop Price($)</label>
                    <input type="number" name="shopPrice" id="shopPrice"
                           placeholder="Shop Price" {...register('shopPrice', {required: true})}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.shopPrice ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="dollarRate"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Dollar Rate</label>
                    <input type="number" name="dollarRate" id="dollarRate"
                           placeholder="Dollar Rate" {...register('dollarRate', {required: true})}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.dollarRate ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="orderDate"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Order Date</label>
                    <input type="date" name="orderDate" id="orderDate"
                           placeholder="Order Date" {...register('orderDate', {required: true})}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.orderDate ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="orderNumber"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Order Number</label>
                    <input type="text" name="orderNumber" id="orderNumber"
                           placeholder="Order Number" {...register('orderNumber')}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.orderNumber ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="arrivedDate"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Arrived Date</label>
                    <input type="date" name="arrivedDate" id="arrivedDate"
                           placeholder="Arrived Date" {...register('arrivedDate')}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.arrivedDate ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="shipmentPrice"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Onex Shipment Price(dr)</label>
                    <input type="number" name="shipmentPrice" id="shipmentPrice"
                           placeholder="Onex Shipment Price" {...register('shipmentPrice')}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.shipmentPrice ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="giftyPrice"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Gifty Price(dr)</label>
                    <input type="number" name="giftyPrice" id="giftyPrice"
                           placeholder="Gifty Price" {...register('giftyPrice')}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"/>

                    {errors.giftyPrice ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>


                <div className="form-group mt-6 flex justify-center">
                    <button type="submit"
                            className="w-[100px] bg-blue text-white text-md font-semibold rounded-[16px] px-4 py-3">Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;