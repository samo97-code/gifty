import React from 'react';
import Loader from "../Loader";

const DataTable = ({children,headers,data,loader}) => {
    return (
        <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr>
                    {
                        headers.map((item) => {
                            return (
                                <th key={item.id} className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                            border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                >
                                    {item.label}
                                </th>
                            )
                        })
                    }
                </tr>
                </thead>


                <tbody>
                    {
                        loader ?
                            <tr>
                                <td colSpan={headers.length}>
                                    <Loader/>
                                </td>
                            </tr> :
                            <>
                                {
                                    !data.length ?
                                        <tr>
                                            <td colSpan={headers.length}>
                                                <p className="flex justify-center text-2xl font-semibold py-10 text-primary-500">
                                                    No data found
                                                </p>
                                            </td>
                                        </tr> :
                                        <>
                                            {children}
                                        </>
                                }
                            </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;