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

const Dashboard = () => {
    const dispatch = useDispatch()
    const [shopInfo, setShopInfo] = useState(null)
    const [products, setProducts] = useState([])
    const [ads, setAds] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetchAllProducts()

        fetchAllAds()
    }, [])

    const fetchAllAds = async () => {
        try {

            const resp = await dispatch(fetchAds())
            if (resp.status === 200) {
                setAds(resp.data)

                let sum = 0
                resp.data.forEach((ads) => {
                    sum += +ads.price_arm
                })

                setShopInfo((prevState) => ({
                    ...prevState,
                    adsTotalSpent: sum,
                    sumSpent: prevState.totalShopSum + prevState.deliveryOnex + sum
                }))

            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const fetchAllProducts = async () => {
        try {
            const resp = await dispatch(fetchProducts())
            if (resp.status === 200) {
                const obj = {
                    totalShopSum: 0,
                    deliveryOnex: 0,
                    income: 0
                }
                setProducts(resp.data)

                let sold = 0
                resp.data.forEach((product) => {
                    obj.totalShopSum += +product.shop_price_arm
                    obj.deliveryOnex += +product.shipment_price
                    obj.income += +product.clean_income

                    if (product.status?.id === 3){
                        sold += +product.gifty_price
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


    return (
        <div className="main-container ">
            {
                loader ? <Loader/>
                    : <div className="pb-10">
                        <div className="mb-8">
                            {shopInfo ? <ShopInfoTable shopInfo={shopInfo}/> : ''}
                        </div>

                        <div className="flex gap-x-8 mb-8">
                            <div className="sold-line w-full">
                                {products ? <PriceBarChart products={products}/> : ''}
                            </div>

                            <div className="sold-line w-full">
                                {ads ? <AdsBarChart ads={ads}/> : ''}
                            </div>
                        </div>

                        <div className="flex gap-x-8 mb-8">
                            <div className="sold-line w-full">
                                {products ? <OrderSoldChart products={products}/> : ''}
                            </div>

                            <div className="sold-line w-full">
                                {soldProducts ? <SoldLineChart soldProducts={soldProducts}/> : ''}
                            </div>
                        </div>


                    </div>
            }


        </div>
    );
};

export default Dashboard;