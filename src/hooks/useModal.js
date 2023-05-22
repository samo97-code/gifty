import {setShowModal} from "../store/user";
import {useDispatch} from "react-redux";

export const useModal = () => {
    const dispatch = useDispatch()

    const showModal = (modalData)=>{
        dispatch(setShowModal(modalData))
    }

    const closeModal = () => {
        const modalData = {
            show: false,
            type: null,
            title: null,
            data: null
        }
        dispatch(setShowModal(modalData))
    }

    return {closeModal,showModal}
}