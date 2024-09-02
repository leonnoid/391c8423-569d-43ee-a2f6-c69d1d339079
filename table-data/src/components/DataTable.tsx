"use client"
import * as React from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
   
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FormControl, InputLabel, MenuItem, Select, Button, TextField } from "@mui/material"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}
export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pageSize, setPageSize] = React.useState(10)
    const [pageIndex, setPageIndex] = React.useState(0)
    const [editingCell, setEditingCell] = React.useState({ rowId: null, cellId: null });
    const [tableData, setTableData] = React.useState(data);
    
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination: {
                pageSize,
                pageIndex,
            },
        },
    })
    const handleCellClick = (rowId: any, cellId: any) => {
        setEditingCell({ rowId, cellId });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, rowId: string, cellId: string) => {
        handleInputChange(e, rowId, cellId);
        setEditingCell({ rowId: null, cellId: null });
    };
    
    const handleInputChange = (e: { target: { value: any } }, rowId: any, cellId: any) => {
        const newValue = e.target.value;
        
        setTableData((data) =>
            data.map((row, index) => {
                if (index === rowId) {
                    return {
                        ...row,
                        [cellId]: newValue,
                    };
                }
                return row;
            })
        );
    };
    return (
        <div>
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                style={{ height: '56px' , padding: 0}}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                    key={cell.id}
                                    onClick={() => handleCellClick(row.id, cell.id)}
                                    style={{ height: '56px' , padding: 0 }}
                                >
                                    {editingCell.rowId === row.id && editingCell.cellId === cell.id ? (
                                        <TextField
                                            defaultValue={cell.getValue()}
                                            variant="filled"
                                            size="small"
                                            onChange={(e) => handleInputChange(e, row.id, cell.id)}
                                            onBlur={(e) => handleBlur(e, row.id, cell.id)}
                                            style={{ height: '56px' , padding: 0}}
                                        />
                                    ) : (
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    )}
                                </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} | Showing {table.getRowModel().rows.length} of {data.length} results
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>setPageIndex(pageIndex - 1)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setPageIndex(pageIndex + 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </Button>
                <FormControl variant="outlined" size="small">
                    <InputLabel id="rows-per-page-label">Rows</InputLabel>
                    <Select
                        labelId="rows-per-page-label"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        label="Rows"
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    </div>
    )
}
