import React from 'react';
import {Bars3Icon} from "@heroicons/react/20/solid";

const Header = ({showSidebar,open}) => {
    return (
        <div className="bg-white shadow-md w-full h-[60px] px-6 sticky top-0">
            {!showSidebar ? <Bars3Icon className="h-8 w-8 text-gray-600 cursor-pointer" onClick={()=>open()}/> : ''}
            Header
        </div>
    );
};

export default Header;