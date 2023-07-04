import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import cogoToast from "cogo-toast";
import {catchErrors} from "../../../utils";
import {useParams} from "react-router";
import {fetchAdsById, updateAds} from "../../../store/ads";
import {socials} from "../../../constants";

const EditAds = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if (params.id) fetchAds()
    }, [params])

    const fetchAds = async () => {
        try {
            const resp = await dispatch(fetchAdsById({id: params.id}))
            if (resp.status === 200) {
                setValue('dollarRate',resp.data.dollar_rate)
                setValue('social',resp.data.social.label)
                setValue('price',resp.data.price)
            }
        } catch (e) {
            catchErrors(e)
        }
    }

    const onSubmit = async (data) => {
        try {
            const prepareData = {
                id: params.id,
                price: data.price,
                dollar_rate: data.dollarRate,
                price_arm: +(data.price * data.dollarRate).toFixed(2),
                social: socials.find((item)=>item.label === data.social),
                created_at: new Date()
            }

            const resp = await dispatch(updateAds(prepareData))
            if (resp.status === 200) {
                await cogoToast.success('Successfully Updated')
            }
        } catch (e) {
            catchErrors(e)
        }
    };

    return (
        <div className="main-container">
            <h2 className="text-primary-900 text-3xl font-bold mb-6">Update Ads</h2>

            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[500px] mx-auto border border-gray-400 rounded-[4px] shadow-md px-4 py-5">
                <div className="form-group mb-4">
                    <label htmlFor="price" className="block mb-1 text-primary-100 text-lg font-semibold">Price($)</label>
                    <input id="price" name="price"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Price($)" type="text" {...register('price', {required: true})}/>

                    {errors.price ?
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
                    <label htmlFor="social"
                           className="block mb-1 text-primary-100 text-lg font-semibold">Social Media</label>
                    <select name="social" id="social" {...register('social')}
                            className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100">
                        {
                            socials.map((social) => {
                                return <option value={social.label} key={social.id}>{social.label}</option>
                            })
                        }
                    </select>

                    {errors.social ?
                        <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                </div>


                <div className="form-group mt-6 flex justify-center">
                    <button type="submit"
                            className="w-[100px] bg-blue text-white text-md font-semibold rounded-[16px] px-4 py-3">Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAds;