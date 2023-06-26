import React, {useEffect, useMemo, useState} from 'react';
import {fetchProducts} from "../../store/product";
import {catchErrors} from "../../utils";
import Loader from "../../components/Ui/Loader";
import {useDispatch} from "react-redux";
import {fetchAds} from "../../store/ads";
import SoldLineChart from "../../components/Ui/Charts/SoldLineChart";
import OrderSoldChart from "../../components/Ui/Charts/OrderSoldChart";
import PriceBarChart from "../../components/Ui/Charts/PriceBarChart";
import AdsBarChart from "../../components/Ui/Charts/AdsBarChart";
import ShopInfoTable from "../../components/Ui/Table/ShopInfoTable";
import Multiselect from "multiselect-react-dropdown";
import {years} from "../../constants";

const Dashboard = () => {
    const dispatch = useDispatch()
    const [shopInfo, setShopInfo] = useState(null)
    const [products, setProducts] = useState([])
    const [ads, setAds] = useState([])
    const [loader, setLoader] = useState(true)
    const [year, setYear] = useState('2023')

    useEffect(() => {
        fetchAllProducts(year)

        setTimeout(() => {
            fetchAllAds(year)
        }, 500)
    }, [year])

    const fetchAllAds = async (date) => {
        try {

            const resp = await dispatch(fetchAds({date}))
            if (resp.status === 200) {
                setAds(resp.data)

                let sum = 0
                resp.data.forEach((ads) => {
                    sum += +ads.price_arm
                })

                setShopInfo((prevState) => ({
                    ...prevState,
                    adsTotalSpent: sum || 0,
                    sumSpent: prevState.totalShopSum + prevState.deliveryOnex + sum || 0
                }))

            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const fetchAllProducts = async (date) => {
        try {
            const options = {
                ne: 'Wishlist',
                date
            }

            const resp = await dispatch(fetchProducts(options))
            if (resp.status === 200) {
                const obj = {
                    totalShopSum: 0,
                    deliveryOnex: 0,
                    income: 0,
                }
                setProducts(resp.data)

                let sold = 0
                resp.data.forEach((product) => {
                    obj.totalShopSum += +product.shop_price_arm
                    obj.deliveryOnex += +product.shipment_price

                    if (product.status?.id === 3) {
                        sold += +product.gifty_price
                        obj.income += +product.clean_income
                    }
                })

                obj.sold = sold
                setShopInfo(obj)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const soldProducts = useMemo(() => {
        return products.filter((item) => item.status.id === 3)
    }, [products])

    const onSelect = (selectedList, selectedItem) => {
        setYear(selectedItem)
    }


    return (
        <div className="main-container ">
            {
                loader ? <Loader/>
                    : <div className="pb-10">
                        <div className="flex items-center gap-x-3 mb-8">
                            <span>Select Year</span>

                            <Multiselect
                                id="row"
                                singleSelect
                                isObject={false}
                                options={years}
                                onSelect={onSelect}
                                selectedValues={[year]}
                            />
                        </div>

                        <div className="mb-8">
                            {shopInfo ? <ShopInfoTable shopInfo={shopInfo} /> : ''}
                        </div>

                        <div className="flex gap-x-8 mb-8">
                            <div className="sold-line w-full">
                                {products ? <PriceBarChart products={products} year={year}/> : ''}
                            </div>

                            <div className="sold-line w-full">
                                {ads ? <AdsBarChart ads={ads} year={year}/> : ''}
                            </div>
                        </div>

                        <div className="flex gap-x-8 mb-8">
                            <div className="sold-line w-full">
                                {products ? <OrderSoldChart products={products} year={year}/> : ''}
                            </div>

                            <div className="sold-line w-full">
                                {soldProducts ? <SoldLineChart soldProducts={soldProducts} year={year}/> : ''}
                            </div>
                        </div>


                    </div>
            }


        </div>
    );
};

export default Dashboard;