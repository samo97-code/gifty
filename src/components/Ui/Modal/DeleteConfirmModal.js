import React from 'react';
import {useSelector} from "react-redux";

const DeleteConfirmModal = ({close}) => {
    const modal = useSelector((state => state.user.modal))

    return (
        <div>
            <p className="text-lg font-semibold text-primary-100">Are you sure that want to delete this item <b>{modal.data.title}</b> ?</p>

            <div className="flex items-center justify-center gap-x-2 mt-4">
                <button type="button"
                        className="text-white text-lg bg-blue px-4 py-2 rounded-[4px]" onClick={()=>modal.data.callback(modal.data.id)}>Yes
                </button>

                <button type="button"
                        className="text-white text-lg bg-error px-4 py-2 rounded-[4px]" onClick={()=>close()}>No
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;