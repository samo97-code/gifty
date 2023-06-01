import React, {useEffect, useState} from 'react';
import SideBar from "../components/Admin/SideBar";
import Header from "../components/Admin/Header";
import Modal from "../components/Ui/Modal";

const AdminLayout = ({children}) => {
    const [showSidebar,setShowSidebar] = useState(true)

    useEffect(()=>{
        window.addEventListener("resize", resizePage);

        if (window.innerWidth <= 991){
            setShowSidebar(false)
        }

        return ()=>{
            window.removeEventListener("resize", resizePage);
        }
    },[])

    const resizePage = ()=>{
        if (window.innerWidth <= 991){
            setShowSidebar(false)
        }else setShowSidebar(true)
    }

    return (
        <div className="h-full">
            {
                showSidebar ? <SideBar close={()=>setShowSidebar(false)}/> : null
            }

            <div className={`main h-full ${showSidebar ? 'ml-[240px]' : ''}`}>
                <Header showSidebar={showSidebar} open={()=>setShowSidebar(true)}/>

                <div className="content-wrapper bg-gray-50 h-main py-10">
                    {children}
                </div>
            </div>

            <Modal />
        </div>
    );
};

export default AdminLayout;