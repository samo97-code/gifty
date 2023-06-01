import React, {useEffect, useRef, useState} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from "react-multi-date-picker"
import {sortBy, statuses} from "../../../constants";

const ProductFilters = ({showFilters, filters, defaultValues, categories, onSetFilters, close}) => {
    const [dates, setValues] = useState([])
    const multiselectCategoriesRef = useRef()
    const multiselectStatuesRef = useRef()
    const multiselectOrderRef = useRef()

    //Dates
    useEffect(() => {
        if (dates[1]) {
            const startDate = dates[0].format('YYYY-MM-DD')
            const endDate = dates[1].format('YYYY-MM-DD')
            const arrDates = [startDate, endDate]
            onSetFilters((prevState => ({...prevState, dates: arrDates})))
        }
    }, [dates])


    //Categories
    const onSelect = (selectedList, selectedItem) => {
        onSetFilters((prevState) => ({...prevState, categories: [...prevState.categories, selectedItem.name]}));
    }
    const onRemove = (selectedList, removedItem) => {
        onSetFilters((prevState) => ({
            ...prevState,
            categories: prevState.categories.filter((item) => item !== removedItem.name)
        }))
    }

    //Statuses
    const onSelectStatus = (selectedList, selectedItem) => {
        onSetFilters((prevState) => ({...prevState, statuses: [...prevState.statuses, selectedItem.name]}));
    }
    const onRemoveStatus = (selectedList, removedItem) => {
        onSetFilters((prevState) => ({
            ...prevState,
            statuses: prevState.statuses.filter((item) => item !== removedItem.name)
        }))
    }

    //Sort
    const onSelectSort = (selectedList, selectedItem) => {
        const sortBy = `_sort=${selectedItem.value}&_order=${selectedItem.order}`
        onSetFilters((prevState => ({...prevState, sortBy: sortBy})))
    }

    // Inputs
    const onChangeHandler = (e) => {
        onSetFilters((prevState => ({...prevState, [e.target.name]: e.target.value})))
    }

    //Reset All filters
    const resetFilters = () => {
        onSetFilters(defaultValues)
        setValues([])
        multiselectStatuesRef.current.resetSelectedValues();
        multiselectCategoriesRef.current.resetSelectedValues();
        multiselectOrderRef.current.resetSelectedValues();
    }

    return (
        <div
            className={`${showFilters ? 'w-[300px] px-4' : 'w-0'} transition-all filters bg-gray-400  py-5 fixed top-0 right-0 h-full z-[2]`}>
            <div className="filter-header flex items-center justify-between ">
                <h3 className="text-primary-900 text-2xl font-bold">Filters</h3>

                <XMarkIcon className="w-7 h-7 cursor-pointer text-primary-500" onClick={() => close()}/>
            </div>

            <div className="bg-white my-4 w-full h-[1px]"></div>


            <div className="filter-content mt-7">
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block mb-1 text-lg font-semibold">Search Name</label>
                    <input id="name" name="name"
                           value={filters.name}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Search By Name" type="text"
                           onChange={(e) => onChangeHandler(e)}
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="brand" className="block mb-1 text-lg font-semibold">Search Brand</label>
                    <input id="brand" name="brand"
                           value={filters.brand}
                           className="px-3 py-3 w-full shadow-md text-primary-100 focus:border-primary-100 focus:ring-primary-100"
                           placeholder="Search By Brand" type="text"
                           onChange={(e) => onChangeHandler(e)}
                    />
                </div>

                <div className="form-group mb-4 sort-by">
                    <label className="block mb-1 text-lg font-semibold">Sort By</label>
                    <Multiselect
                        id="categories"
                        singleSelect
                        ref={multiselectOrderRef}
                        options={sortBy}
                        onSelect={onSelectSort}
                        displayValue="name"
                        placeholder="Sort By"
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="categories" className="block mb-1 text-lg font-semibold">Select Categories</label>
                    <Multiselect
                        id="categories"
                        options={categories}
                        ref={multiselectCategoriesRef}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        placeholder="Search By Categories"
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="categories" className="block mb-1 text-lg font-semibold">Select Status</label>
                    <Multiselect
                        id="categories"
                        options={statuses}
                        ref={multiselectStatuesRef}
                        onSelect={onSelectStatus}
                        onRemove={onRemoveStatus}
                        displayValue="name"
                        placeholder="Search By Statuses"
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="date" className="block mb-1 text-lg font-semibold">Select Orders Date</label>
                    <DatePicker
                        id="date"
                        value={dates}
                        onChange={setValues}
                        range
                        placeholder="Search By Orders Date"
                    />
                </div>

                <div>
                    <button type="button"
                            className="w-full bg-blue text-white text-md font-semibold rounded-[8px] px-4 py-3"
                            onClick={() => resetFilters()}>Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;