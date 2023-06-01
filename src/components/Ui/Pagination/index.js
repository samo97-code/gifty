import React, {useEffect, useState} from 'react';
import Multiselect from "multiselect-react-dropdown";
import {ChevronLeftIcon} from "@heroicons/react/20/solid";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {ChevronDoubleLeftIcon} from "@heroicons/react/20/solid";
import {ChevronDoubleRightIcon} from "@heroicons/react/20/solid";
import {productDefaultLimit} from "../../../constants";

const Pagination = ({headerData, updateProducts}) => {
    const options = [8, 10, 20, 30, 50]
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(productDefaultLimit)
    const [total, setTotal] = useState(0)
    const [paginationLinks, setPaginationLinks] = useState(null)

    const currentCounts = page * pageSize > total ? total : page * pageSize
    const current = +page === 1 ? 1 : (+page - 1) * pageSize + 1

    useEffect(() => {
        if (headerData) {
            if (headerData.total) setTotal(headerData.total)
            if (headerData.links) parseLinkHeader(headerData.links)
        }
    }, [headerData])

    const onSelect = (selectedList, selectedItem) => {
        setPageSize(selectedItem)
        setPage(1)
        updateProducts(`_page=1&_limit=${selectedItem}`)
    }

    const parseLinkHeader = (linkHeader) => {
        const linkHeadersArray = linkHeader.split(", ").map(header => header.split("; "));
        const linkHeadersMap = linkHeadersArray.map(header => {
            const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
            const thisHeaderUrl = header[0].slice(1, -1);
            return [thisHeaderRel, thisHeaderUrl]
        });
        return setPaginationLinks(Object.fromEntries(linkHeadersMap));
    }

    const paginate = (type) => {
        const splitItem = paginationLinks[type].split("?")
        const tempSplitItem = splitItem[1].split("&")

        const url = `${tempSplitItem[0]}&${tempSplitItem[1]}`
        const page = tempSplitItem[0].split('=')[1]

        setPage(page)
        updateProducts(url)
    }


    return (
        <div className="mt-4 flex sm:justify-end">
            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-3 sm:gap-y-0 sm:items-center">
                <div className="flex gap-x-2 items-center">
                    <span className="text-primary-900">Rows per page:</span>
                    <Multiselect
                        id="row"
                        singleSelect
                        isObject={false}
                        options={options}
                        onSelect={onSelect}
                        selectedValues={[productDefaultLimit]}
                    />
                </div>

                <div className="flex gap-x-3 items-center">
                    <span className="text-primary-900">{current}–{currentCounts} of <b>{total}</b></span>

                    {
                        headerData?.links ? <div className="flex items-center">
                        <span
                            onClick={paginationLinks?.first && paginationLinks?.prev ? () => paginate('first') : null}
                            className={`${paginationLinks?.first && paginationLinks?.prev ? 'cursor-pointer bg-white' : 'bg-gray-200 cursor-not-allowed'} px-2 py-1 border`}>
                            <ChevronDoubleLeftIcon className="h-5 w-5 text-primary-900"/>
                        </span>
                            <div className="flex">
                            <span
                                onClick={paginationLinks?.prev ? () => paginate('prev') : null}
                                className={`${paginationLinks?.prev ? 'cursor-pointer bg-white' : 'bg-gray-200 cursor-not-allowed'} px-2 py-1 border`}>
                                <ChevronLeftIcon className="h-5 w-5 text-primary-900"/>
                            </span>
                                <span
                                    onClick={paginationLinks?.next ? () => paginate('next') : null}
                                    className={`${paginationLinks?.next ? 'cursor-pointer bg-white' : 'bg-gray-200 cursor-not-allowed'} px-2 py-1 border`}>
                                <ChevronRightIcon className="h-5 w-5 text-primary-900"/>
                            </span>
                            </div>
                            <span
                                onClick={paginationLinks?.last && paginationLinks?.next ? () => paginate('last') : null}
                                className={`${paginationLinks?.last && paginationLinks?.next ? 'cursor-pointer bg-white' : 'bg-gray-200 cursor-not-allowed'} px-2 py-1 border`}>
                            <ChevronDoubleRightIcon className="h-5 w-5 text-primary-900"/>
                        </span>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Pagination;