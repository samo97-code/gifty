import React from 'react';
import {useForm} from "react-hook-form";
import cogoToast from 'cogo-toast';
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {createAds} from "../../../store/ads";
import {catchErrors} from "../../../utils";
import {socials} from "../../../constants";

const CreateAds = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const dispatch = useDispatch()

    const onSubmit = async(data) => {
        try {

            const prepareData = {
                id: uuidv4(),
                price: data.price,
                dollar_rate: data.dollarRate,
                price_arm: data.price * data.dollarRate,
                social: socials.find((item)=>item.label === data.social)
            }

            const resp = await dispatch(createAds(prepareData))
            if (resp){
                await reset()
                await cogoToast.success('Successfully Created')
            }
        }catch (e) {
            catchErrors(e)
        }
    };


    return (
        <div className="main-container">
            <h2 className="text-primary-900 text-3xl font-bold mb-6">Create Ads</h2>

            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[500px] mx-auto border border-gray-400 rounded-[4px] shadow-md px-4 py-5">
                <div className="form-group mb-4">
                    <label htmlFor="price" className="block mb-1 text-primary-100 text-lg font-semibold">Price($)</label>
                    <input id="price" name="price"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Price($)" type="number" {...register('price', {required: true})}/>

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
                            className="w-[100px] bg-blue text-white text-md font-semibold rounded-[16px] px-4 py-3">Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAds;