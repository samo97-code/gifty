import React, {useEffect, useState} from 'react';
import {catchErrors} from "../../../utils";
import {useDispatch} from "react-redux";
import DataTable from "../../../components/Ui/Table/DataTable";
import {useNavigate} from "react-router";
import cogoToast from "cogo-toast";
import {useModal} from "../../../hooks/useModal";
import {fetchAds, deleteAds} from "../../../store/ads";
import Pagination from "../../../components/Ui/Pagination";

const Ads = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modal = useModal()

    const [ads, setAds] = useState([])
    const [paginationData, setPaginationData] = useState(null)
    const [loader, setLoader] = useState(true)

    const headers = [
        {id: 1, label: 'Social'},
        {id: 2, label: 'Price($)'},
        {id: 3, label: 'Dollar Rate'},
        {id: 4, label: 'Price(դր)'},
        {id: 5, label: 'Action'},
    ]

    useEffect(() => {
        fetchAllAds()
    }, [])

    const fetchAllAds = async (pagination) => {
        try {
            const options = {
                paginate: pagination ? pagination : `_page=1&_limit=8`
            }

            const resp = await dispatch(fetchAds(options))
            if (resp.status === 200) {
                setAds(resp.data)

                const obj = {
                    total: resp.headers['x-total-count'],
                    links: resp.headers.link,
                }
                setPaginationData(obj)
            }
        } catch (e) {
            catchErrors(e)
        } finally {
            setLoader(false)
        }
    }

    const toLink = (item)=>{
        navigate(`/admin/ads/edit/${item.id}`)
    }

    const showDeleteModal = (item)=>{
        const modalData = {
            show: true,
            type: 'delete-confirm',
            title: 'Delete Confirm',
            data: {
                id: item.id,
                title: item.name,
                callback: deleteCurrentAds
            }
        }

        modal.showModal(modalData)
    }

    const deleteCurrentAds = async(id) => {
        try {
            const resp =  await dispatch(deleteAds({id}))
            if (resp.status === 200){
                await fetchAllAds()
                await modal.closeModal()
                await cogoToast.success('Successfully deleted')
            }
        }catch (e) {
            catchErrors(e)
        }
    }


    return (
        <div className="main-container">
            <DataTable headers={headers} data={ads} loader={loader}>
                {
                    ads.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                    width="15%">
                                    <span>{item.social.label}</span>
                                </td>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                    width="15%">
                                    <span>{item.price}</span>
                                </td>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                    width="15%">
                                    <span>{item.dollar_rate}</span>
                                </td>
                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                    width="15%">
                                    <b className="text-[16px] text-[#0b35d5]">{item.price_arm}</b>
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

            {/*{*/}
            {/*    !loader && ads.length ? <Pagination paginationData={paginationData} updateProducts={fetchAllAds}/> : null*/}
            {/*}*/}
        </div>
    )
};

export default Ads;