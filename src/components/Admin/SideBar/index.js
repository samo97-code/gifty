import React from 'react';
import {NavLink} from "react-router-dom";
import {Bars3Icon} from "@heroicons/react/20/solid";
import {PlusCircleIcon} from "@heroicons/react/20/solid";

const SideBar = ({close}) => {
    return (
        <div className="sidebar fixed h-full">
            <div className="w-[240px] bg-primary-900 h-full px-5">
                <div className="pt-6 mb-6 flex justify-between items-center">
                    <span className="text-gray-100 text-3xl">Hello</span>
                    <Bars3Icon className="h-8 w-8 text-gray-100 cursor-pointer" onClick={()=>close()}/>
                </div>

                <div className="bg-white my-3 w-full h-[1px]"/>

                <ul className="mt-8">
                    <li className="mb-2">
                        <NavLink to="/admin/category/create"
                                 className={({isActive, isPending}) =>
                                     [isActive ? "active bg-primary-300 text-white" : "text-gray-100",
                                         'flex gap-x-3 items-center px-3 py-2 hover:bg-primary-100 rounded-[4px]'].join(' ')
                                 }>
                            <PlusCircleIcon className="h-5 w-5" />
                            <span>Create Category</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/categories"
                                 className={({isActive, isPending}) =>
                                     [isActive ? "active bg-primary-300 text-white" : "text-gray-100",
                                         'flex gap-x-3 items-center px-3 py-2 hover:bg-primary-100 rounded-[4px]'].join(' ')
                                 }>
                            <PlusCircleIcon className="h-5 w-5" />
                            <span>Categories</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;