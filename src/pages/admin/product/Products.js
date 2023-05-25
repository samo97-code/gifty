import React, {useEffect, useMemo, useState} from 'react';
import {deleteProduct, fetchProducts} from "../../../store/product";
import {catchErrors} from "../../../utils";
import {useDispatch} from "react-redux";
import DataTable from "../../../components/Ui/Table/DataTable";
import cogoToast from "cogo-toast";
import {useNavigate} from "react-router";
import {useModal} from "../../../hooks/useModal";

const Products = () => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [defaultHeaders, setDefaultHeaders] = useState(['title', 'brand', 'productUrl', 'status', 'shopPriceDollar', 'giftyPrice', 'cleanIncome', 'action'])
    const [loader, setLoader] = useState(true)

    const navigate = useNavigate()
    const modal = useModal()

    const allHeaders = [
        {id: 1, label: 'Name', value: 'title'},
        {id: 2, label: 'Brand', value: 'brand'},
        {id: 3, label: 'Product Url', value: 'productUrl'},
        {id: 4, label: 'Shop Name', value: 'shop'},
        {id: 5, label: 'Status', value: 'status'},
        {id: 6, label: 'In Stock', value: 'inStock'},
        {id: 7, label: 'Category', value: 'category'},
        {id: 8, label: 'Size', value: 'size'},
        {id: 9, label: 'Quantity', value: 'quantity'},
        {id: 10, label: 'Shop Price($)', value: 'shopPrice'},
        {id: 11, label: 'Dollar Rate', value: 'dollarRate'},
        {id: 12, label: 'Shop Price(dr)', value: 'shopPriceArm'},
        {id: 13, label: 'Order Date', value: 'orderDate'},
        {id: 14, label: 'Order Number', value: 'orderNumber'},
        {id: 15, label: 'Arrived Date', value: 'arrivedDate'},
        {id: 16, label: 'Shipment Price(dr)', value: 'shipmentPrice'},
        {id: 17, label: 'Gifty Price(dr)', value: 'giftyPrice'},
        {id: 18, label: 'Clean Income(dr)', value: 'cleanIncome'},
        {id: 19, label: 'Sold', value: 'sold'},
        {id: 20, label: 'Action', value: 'action'},
    ]

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const headers = useMemo(() => {
        return allHeaders.filter((item) => defaultHeaders.includes(item.value))
    }, [])

    const fetchAllProducts = async () => {
        try {
            const resp = await dispatch(fetchProducts())
            if (resp.status === 200) {
                setProducts(resp.data)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const toLink = (item) => {
        navigate(`/admin/product/edit/${item.id}`)
    }

    const showDeleteModal = (item) => {
        const modalData = {
            show: true,
            type: 'delete-confirm',
            title: 'Delete Confirm',
            data: {
                id: item.id,
                title: item.title,
                callback: deleteCurrentProduct
            }
        }

        modal.showModal(modalData)
    }

    const deleteCurrentProduct = async (id) => {
        try {
            const resp = await dispatch(deleteProduct({id}))
            if (resp.status === 200) {
                await fetchAllProducts()
                await modal.closeModal()
                await cogoToast.success('Successfully deleted')
            }
        } catch (e) {
            catchErrors(e)
        }
    }

    return (
        <div className="main-container">
            <DataTable headers={headers} data={products} loader={loader}>
                {
                    products.map((item) => {
                        return (
                            <tr key={item.id}>
                                {
                                    defaultHeaders.includes('title') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.title}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('brand') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.brand}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('productUrl') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.productUrl}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shop') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.shop}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('status') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.status?.name}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('isInStock') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.isInStock ? 'Yes' : 'no'}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('category') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.category?.name}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('size') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.size?.name}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('quantity') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.quantity}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shopPrice') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.shopPrice}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('dollarRate') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.dollarRate}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shopPriceArm') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.shopPriceArm} dr</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('orderDate') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.orderDate}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('orderNumber') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.orderNumber}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('arrivedDate') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.arrivedDate}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shipmentPrice') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.shipmentPrice}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('giftyPrice') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.giftyPrice}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('cleanIncome') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.cleanIncome}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('sold') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>Sold</span>
                                        </td> : null
                                }
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    width="5%">
                                    <div className="flex items-center gap-x-2">
                                        <button type="button"
                                                className="text-white bg-blue px-2 py-2 rounded-[4px]"
                                                onClick={() => toLink(item)}>Edit
                                        </button>

                                        <button type="button"
                                                className="text-white bg-error px-2 py-2 rounded-[4px]"
                                                onClick={() => showDeleteModal(item)}>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </DataTable>
        </div>
    );
};

export default Products;