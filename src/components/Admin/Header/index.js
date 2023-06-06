import React, {useEffect, useState} from 'react';
import {Bars3Icon} from "@heroicons/react/20/solid";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import cogoToast from "cogo-toast";

const Header = ({showSidebar,open}) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [user,setUser] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{

        if (cookies.gifty_user) setUser(cookies.gifty_user)
    },[])

    const logout = async ()=>{
         removeCookie('gifty_user')
         cogoToast.success('Successfully logout')
         navigate('/')
    }


    return (
        <div className="bg-white shadow-md w-full h-[60px] px-6 sticky top-0">
            {!showSidebar ? <Bars3Icon className="h-8 w-8 text-gray-600 cursor-pointer" onClick={()=>open()}/> : ''}

            <div className="flex justify-between items-center h-full">
                <b>{user?.first_name} {user?.last_name}</b>

                <div>


                    <button type="button"
                            className="ml-4 bg-blue text-white text-md font-semibold rounded-[8px] px-4 py-2"
                            onClick={() => logout()}>Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;