import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import cogoToast from "cogo-toast";
import {catchErrors} from "../../utils";
import {useForm} from "react-hook-form";
import {fetchAllUsers} from "../../store/user";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [cookies, setCookie] = useCookies(['gifty_user']);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        if (cookies.gifty_user) return navigate('/admin')
    }

    const onSubmit = async (data) => {
        try {
            const users = await fetchUsers()
            const findItem = users.find((item) => item.email === data.email)

            if (!findItem) return cogoToast.success('User not exists')

            setCookie('gifty_user', findItem, {
                path: '/',
                maxAge: 60 * 60 * 24 * 59,
            })
            cogoToast.success('Successfully LoggedIn')
            navigate('/admin')

        } catch (e) {
            catchErrors(e)
        }
    };

    const fetchUsers = async () => {
        try {
            const resp = await dispatch(fetchAllUsers())
            return resp.data
        } catch (e) {
            catchErrors(e)
        }
    }

    return (
        <div>
            <div className="main-container">
                <form onSubmit={handleSubmit(onSubmit)}
                      className="w-[500px] mx-auto border border-gray-400 rounded-[4px] shadow-md px-4 py-5 mt-16">

                    <h2 className="text-primary-900 text-3xl font-bold mb-7">Sign In</h2>

                    <div className="form-group mb-4">
                        <label htmlFor="email"
                               className="block mb-1 text-primary-100 text-lg font-semibold">Email</label>
                        <input id="email" name="email"
                               className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                               placeholder="Email" type="email" {...register('email', {required: true})}/>

                        {errors.email ?
                            <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="password"
                               className="block mb-1 text-primary-100 text-lg font-semibold">Password</label>
                        <input id="password" name="password"
                               className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                               placeholder="Password" type="password" {...register('password', {required: true})}/>

                        {errors.password ?
                            <p className="mt-[2px] text-sm text-error font-semibold">Field is required</p> : null}
                    </div>


                    <div className="form-group mt-8 flex justify-center">
                        <button type="submit"
                                className="w-full bg-blue text-white text-md font-semibold rounded-[4px] px-4 py-3">Sign
                            In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;