import React from "react";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy, usePagination } from "react-table";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

function Table({ columns, data }) {
    const { getTableProps,getTableBodyProps,headerGroups,prepareRow,page,canPreviousPage,canNextPage,pageOptions,pageCount,
        gotoPage,nextPage,previousPage,setPageSize,state,preGlobalFilteredRows,setGlobalFilter } = useTable({ columns, data },
        useFilters,useGlobalFilter,useSortBy,usePagination );

        const paginationValue = (num) => {
            console.log("NUMMM",num);
        }

    return ( 
        <>
        {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
            column.Filter ? (
                <div key={column.id}>{column.render("Filter")}</div>
            ) : null
            )
        )}

        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-200"
                >
                    <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th
                            scope="col"
                            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps(
                                column.getSortByToggleProps()
                            )}
                            >
                            <div className="flex items-center justify-between">
                                {column.render("Header")}
                                {/* Add a sort direction indicator */}
                                <span>
                                {/* {column.isSorted ? (
                                    column.isSortedDesc ? (
                                    <SortDownIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                    <SortUpIcon className="w-4 h-4 text-gray-400" />
                                    )
                                ) : (
                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                )} */}
                                </span>
                            </div>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                    >
                    {page.map((row, i) => {
                        // new
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                            return (
                                <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                >
                                {cell.render("Cell")}
                                </td>
                            );
                            })}
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md" onClick={() => nextPage()}
                disabled={!canPreviousPage} type="button" ><FaAngleRight className="h-5 w-5" aria-hidden="true" /></button>
            {/* <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
            </Button> */}
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2">
                <span className="text-sm text-gray-700">
                Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
                <span className="font-medium">{pageOptions.length}</span>
                </span>
                <label>
                <span className="sr-only">Items Per Page</span>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={state.pageSize}
                    onChange={(e) => {
                    setPageSize(Number(e.target.value)); paginationValue(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                    ))}
                </select>
                </label>
            </div>
            <div>
                <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
                >
                <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md" onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage} type="button" ><FaAnglesLeft className="h-5 w-5" aria-hidden="true" /></button>

                <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md" onClick={() => previousPage()}
                    disabled={!canPreviousPage} type="button" ><FaAngleLeft className="h-5 w-5" aria-hidden="true" /></button>

                <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md" onClick={() => nextPage()}
                    disabled={!canPreviousPage} type="button" ><FaAngleRight className="h-5 w-5" aria-hidden="true" /></button>

                <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md" onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canPreviousPage} type="button" ><FaAnglesRight className="h-5 w-5" aria-hidden="true" /></button>
                </nav>
            </div>
            </div>
        </div>
        </>
    );
}

export default Table;