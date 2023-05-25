import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchCategoryById, updateCategory} from "../../../store/category";
import cogoToast from "cogo-toast";
import {catchErrors} from "../../../utils";
import {useParams} from "react-router";

const EditCategory = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if (params.id) fetchCategory()
    }, [params])

    const fetchCategory = async () => {
        try {
            const resp = await dispatch(fetchCategoryById({id: params.id}))
            if (resp.status === 200) {
                setValue('name',resp.data.name)
            }
        } catch (e) {
            catchErrors(e)
        }
    }

    const onSubmit = async (data) => {
        try {
            const prepareData = {
                name: data.name,
                id: params.id
            }

            const resp = await dispatch(updateCategory(prepareData))
            if (resp.status === 200) {
                await cogoToast.success('Successfully Updated')
            }
        } catch (e) {
            catchErrors(e)
        }
    };

    return (
        <div className="main-container">
            <h2 className="text-primary-900 text-3xl font-bold mb-6">Update Category</h2>

            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[500px] mx-auto border border-gray-400 rounded-[4px] shadow-md px-4 py-5">
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block mb-1 text-primary-100 text-lg font-semibold">Name</label>
                    <input id="name" name="name"
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Name" type="text" {...register('name', {required: true})}/>

                    {errors.name ?
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

export default EditCategory;