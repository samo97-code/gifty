import React, {useEffect, useState} from 'react';
import {fetchProducts} from "../../store/product";
import {catchErrors} from "../../utils";
import Loader from "../../components/Ui/Loader";
import {useDispatch} from "react-redux";
import {fetchAds} from "../../store/ads";

const Dashboard = () => {
    const dispatch = useDispatch()
    const [shopInfo, setShopInfo] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetchAllProducts()

        fetchAllAds()
    }, [])

    const fetchAllAds = async (pagination) => {
        try {

            const resp = await dispatch(fetchAds())
            if (resp.status === 200) {

                let sum = 0
                resp.data.forEach((ads) => {
                    sum += +ads.price_arm
                })

                setShopInfo((prevState)=>({...prevState, adsTotalSpent: sum}))

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

                resp.data.forEach((product) => {
                    obj.totalShopSum += +product.shop_price_arm
                    obj.deliveryOnex += +product.shipment_price
                    obj.income += +product.clean_income
                })

                setShopInfo(obj)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    console.log(shopInfo,'shopInfo')

    return (
        <div className="main-container ">
            {
                loader ? <Loader/>
                    : <div className="text-3xl">
                        {/*<p>Total Spent on Shops: <b>{shopInfo.totalShopSum.toFixed(2)}</b> dram</p>*/}

                        {/*<p>Total Spent on Onex: <b>{shopInfo.deliveryOnex}</b> dram</p>*/}

                        {/*<p>Total Spent on Ads: <b>{shopInfo.adsTotalSpent}</b> dram</p>*/}

                        {/*<p>Clean Income: <b>{shopInfo.income.toFixed(2)}</b> dram</p>*/}
                    </div>
            }


        </div>
    );
};

export default Dashboard;