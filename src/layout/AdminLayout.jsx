import React, {useState} from 'react';
import SideBar from "../components/Admin/SideBar";
import Header from "../components/Admin/Header";
import Modal from "../components/Ui/Modal";

const AdminLayout = ({children}) => {
    const [showSidebar,setShowSidebar] = useState(true)

    return (
        <div>
            {
                showSidebar ? <SideBar close={()=>setShowSidebar(false)}/> : null
            }

            <div className={`main ${showSidebar ? 'ml-[280px]' : ''}`}>
                <Header showSidebar={showSidebar} open={()=>setShowSidebar(true)}/>

                <div className="content-wrapper bg-gray-50 h-main pt-10">
                    {children}
                </div>
            </div>

            <Modal />
        </div>
    );
};

export default AdminLayout;