import React, {useEffect, useMemo, useState} from 'react';
import {deleteProduct, fetchProducts} from "../../../store/product";
import {catchErrors} from "../../../utils";
import {useDispatch} from "react-redux";
import DataTable from "../../../components/Ui/Table/DataTable";
import cogoToast from "cogo-toast";
import {useNavigate} from "react-router";
import {useModal} from "../../../hooks/useModal";
import {allHeaders} from "../../../constants";
import {fetchCategories} from "../../../store/category";
import ProductFilters from "../../../components/Admin/ProductFilters";
import Pagination from "../../../components/Ui/Pagination";
import {productDefaultLimit} from "../../../constants";

const defaultValues = {
    name: '',
    brand: '',
    categories: [],
    statuses: [],
    dates: []
}

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modal = useModal()

    const [products, setProducts] = useState([])
    const [defaultHeaders, setDefaultHeaders] = useState(['title', 'brand', 'category', 'product_url', 'status', 'shop_price', 'gifty_price', 'clean_income', 'action'])
    const [loader, setLoader] = useState(true)
    const [showFilters, setShowFilters] = useState(false)
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState(defaultValues)
    const [headerData, setHeaderData] = useState(null)


    const headers = useMemo(() => {
        return allHeaders.filter((item) => defaultHeaders.includes(item.value))
    }, [])

    useEffect(() => {
        fetchAllCategories()
    }, [])

    useEffect(() => {
        setLoader(true)

        setTimeout(() => {
            fetchAllProducts()
        }, 300)

    }, [filters])


    const fetchAllCategories = async () => {
        try {
            const resp = await dispatch(fetchCategories())
            if (resp.data) {
                setCategories(resp.data)
            }
        } catch (e) {
            catchErrors(e)
        }
    }


    const fetchAllProducts = async (pagination) => {
        try {
            setProducts([])
            const options = {
                name: filters.name,
                brand: filters.brand,
                categories: filters.categories,
                statuses: filters.statuses,
                dateRanges: filters.dates,
                paginate: pagination ? pagination : `_page=1&_limit=${productDefaultLimit}`
            }


            const resp = await dispatch(fetchProducts(options))

            if (resp.status === 200) {
                setProducts(resp.data)

                const obj = {
                    total: resp.headers['x-total-count'],
                    links: resp.headers.link,
                }
                setHeaderData(obj)
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


    console.log(filters, 'filters')


    return (
        <div className="main-container">
            <ProductFilters
                showFilters={showFilters}
                filters={filters}
                defaultValues={defaultValues}
                categories={categories}
                onSetFilters={setFilters}
                close={() => setShowFilters(false)}
            />


            <div className="filters flex items-center justify-between mb-6">
                <h2 className="text-primary-900 text-2xl font-bold">Products</h2>

                <span className="text-md font-semibold underline cursor-pointer"
                      onClick={() => setShowFilters(true)}>Show Filters
                </span>
            </div>

            <DataTable headers={headers} data={products} loader={loader}>
                {
                    products.map((item) => {
                        return (
                            <tr key={item.id}>
                                {
                                    defaultHeaders.includes('title') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span className="text-sm">{item.title}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('brand') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span className="text-sm">{item.brand}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('product_url') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <a className="text-blue underline overflow-ellipsis overflow-hidden whitespace-normal line-clamp-1"
                                               href={item.product_url} target="_blank">
                                                <span>{item.product_url}</span>
                                            </a>

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
                                            <span style={{background: `${item.status.color}`}}
                                                  className={`px-4 py-2 rounded-[16px] text-white font-semibold`}>{item.status?.name}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('is_in_stock') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.is_in_stock ? 'Yes' : 'no'}</span>
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
                                    defaultHeaders.includes('shop_price') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <b className="text-sm">{item.shop_price}</b>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('dollar_rate') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.dollar_rate}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shop_price_arm') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <b className="text-sm">{item.shop_price_arm} dr</b>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('order_date') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.order_date}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('order_number') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.order_number}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('arrived_date') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <span>{item.arrived_date}</span>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('shipment_price') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <b className="text-sm">{item.shipment_price}</b>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('gifty_price') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <b className="text-sm">{item.gifty_price}</b>
                                        </td> : null
                                }
                                {
                                    defaultHeaders.includes('clean_income') ?
                                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                            width="15%">
                                            <b className="text-sm">{item.clean_income}</b>
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

            {
                !loader ? <Pagination headerData={headerData} updateProducts={fetchAllProducts}/> : null
            }


        </div>
    );
};

export default Products;