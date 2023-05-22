import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {setShowModal} from "../../../store/user";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Modal = () => {
    const dispatch = useDispatch()
    const modal = useSelector((state => state.user.modal))
    const [component, setComponent] = useState(null)

    useEffect(() => {
        setComponent(modal.type);
    }, [modal.type]);

    const close = () => {
        const obj = {
            show: false,
            type: null,
            title: null
        }
        dispatch(setShowModal(obj))
    }

    const list = {
        'delete-confirm': <DeleteConfirmModal close={close}/>,
    };

    return (
        <div>
            {
                modal.show ?
                    <div className="overlay fixed top-0 left-0 h-full w-full bg-[#0000007a]">
                        <div
                            className="modal-wrapper middle-screen w-[450px] px-6 py-6 bg-gray-50 border-2 border-primary-100 rounded-[6px] shadow-md">

                            <div className="header flex items-center justify-between">
                                <span className="text-primary-500 text-2xl font-semibold">{modal.title}</span>

                                <XMarkIcon className="h-6 w-6 text-primary-500 cursor-pointer" onClick={() => close()}/>
                            </div>

                            <div className="w-full h-[1px] bg-primary-100 my-4"/>

                            <div className="content">
                                {list[component]}
                            </div>

                        </div>
                    </div> : ''
            }
        </div>
    );
};

export default Modal;