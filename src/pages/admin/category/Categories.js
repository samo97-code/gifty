import React, {useEffect, useState} from 'react';
import {fetchCategories, deleteCategory} from "../../../store/category";
import {catchErrors} from "../../../utils";
import {useDispatch} from "react-redux";
import DataTable from "../../../components/Ui/Table/DataTable";
import {useNavigate} from "react-router";
import cogoToast from "cogo-toast";
import {useModal} from "../../../hooks/useModal";

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modal = useModal()

    const [categories, setCategories] = useState([])
    const [loader, setLoader] = useState(true)

    const headers = [
        {id: 1, label: 'Id'},
        {id: 2, label: 'Name'},
        {id: 3, label: 'Action'},
    ]

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const fetchAllCategories = async () => {
        try {
            const resp = await dispatch(fetchCategories())
            if (resp.data) {
                setCategories(resp.data)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const toLink = (item)=>{
        navigate(`/admin/category/edit/${item.id}`)
    }

    const showDeleteModal = (item)=>{
        const modalData = {
            show: true,
            type: 'delete-confirm',
            title: 'Delete Confirm',
            data: {
                id: item.id,
                title: item.name,
                callback: deleteCurrentCategory
            }
        }

        modal.showModal(modalData)
    }

    const deleteCurrentCategory = async(id) => {
        try {
            const resp =  await dispatch(deleteCategory({id}))
            if (resp.status === 200){
                await fetchAllCategories()
                await modal.closeModal()
                await cogoToast.success('Successfully deleted')
            }
        }catch (e) {
            catchErrors(e)
        }
    }


    return (
        <div className="main-container">
            <DataTable headers={headers} data={categories} loader={loader}>
                {
                    categories.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    width="15%">
                                    <span>{item.id}</span>
                                </td>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    width="15%">
                                    <span>{item.name}</span>
                                </td>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    width="15%">
                                    <div className="flex items-center gap-x-2">
                                        <button type="button"
                                                className="text-white bg-blue px-2 py-2 rounded-[4px]" onClick={()=>toLink(item)}>Edit
                                        </button>

                                        <button type="button"
                                                className="text-white bg-error px-2 py-2 rounded-[4px]" onClick={()=>showDeleteModal(item)}>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </DataTable>
        </div>
    )
};

export default Categories;