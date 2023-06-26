import React from 'react';

const ShopInfoTable = ({shopInfo}) => {
    return (
        <table className="items-center w-full bg-transparent border-collapse shop-info">
            <thead>
            <tr>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Orders
                </th>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Onex
                </th>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Ads
                </th>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Total
                </th>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Sold
                </th>
                <th className="px-3 h-[54px] align-middle border border-solid py-3 text-xs bg-primary-100 text-white
                                                    border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Clean Income
                </th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.totalShopSum?.toFixed(0)}
                    <span className="text-sm">դր</span>
                </td>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.deliveryOnex?.toFixed(0)}
                    <span className="text-sm">դր</span>
                </td>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.adsTotalSpent?.toFixed(0) || 0}
                    <span className="text-sm">դր</span>
                </td>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.sumSpent?.toFixed(0) || 0}
                    <span className="text-sm">դր</span>
                </td>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.sold?.toFixed(0)}
                    <span className="text-sm">դր</span>
                </td>
                <td className="text-3xl border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    {shopInfo?.income?.toFixed(0)}
                    <span className="text-sm">դր</span>
                </td>
            </tr>
            </tbody>

        </table>
    );
};

export default ShopInfoTable;