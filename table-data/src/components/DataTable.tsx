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
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, IconButton, FormHelperText, styled, Alert, Box } from "@mui/material"
import { ChevronLeftIcon, ChevronRightIcon, SaveIcon, PlusIcon } from "lucide-react"
import { Data } from "@/app/page"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends Data, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pageSize, setPageSize] = React.useState(10)
    const [pageIndex, setPageIndex] = React.useState(0)
    const [editingCell, setEditingCell] = React.useState<{ rowId: string | null, cellId: keyof TData | null }>({ rowId: null, cellId: null })
    const [tableData, setTableData] = React.useState(data)
    const [editedData, setEditedData] = React.useState(data)
    const [savedData, setSavedData] = React.useState(data)
    const [editedCells, setEditedCells] = React.useState<{ [key: string]: boolean }>({})
    const [error, setError] = React.useState<{ [key: string]: string }>({}) 

    const validateEmail = (email: string, rowId: string): string => {
        const isValid = /^.+@.+\.(id|com)$/.test(email);
        const isUnique = !tableData.some((row, index) => index.toString() !== rowId && row.Email === email);
        if (!isValid) {
            return 'Invalid email format';
        }
        if (!isUnique) {
            return 'Email must be unique';
        }
        return '';
    };
    
    const validatePhoneNumber = (phoneNumber: string): string => {
        const isValid = /^\d+$/.test(phoneNumber);
        if (!isValid) {
            return 'This data must consist of only numbers';
        }
        return '';
    };
    
    const validateCell = (value: string, cellId: keyof TData, rowId: string): string => {
        if (value.trim() === '') {
            return 'Data cannot be empty';
        }
        if (cellId === 'Email') {
            return validateEmail(value, rowId);
        }
        if (cellId === 'Phone') {
            return validatePhoneNumber(value);
        }
        return '';
    };
    
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

    const handleCellClick = (rowId: string, cellId: keyof TData) => {
        setEditingCell({ rowId, cellId });
    };

    const handleBlur = () => {
        setEditingCell({ rowId: null, cellId: null });
    };

    const handleInputChange = (e: { target: { value: any } }, rowId: string, cellId: keyof TData) => {
        const newValue = e.target.value;
        const updatedData = tableData.map((row, index) => {
            if (index.toString() === rowId) {
                return {
                    ...row,
                    [cellId]: newValue,
                };
            }
            return row;
        });
        setEditedData(updatedData);
        setTableData(updatedData);
    
        setEditedCells((prev) => ({
            ...prev,
            [`${rowId}-${String(cellId)}`]: true,
        }));
    
        const error = validateCell(newValue, cellId, rowId);
        setError((prev) => ({
            ...prev,
            [`${rowId}-${String(cellId)}`]: error,
        }));
    };

    const handleSave = () => {
        setSavedData(editedData);
        handleBlur();
        setEditedCells({});
        setError({});
    };

    const createEmptyRow = (): TData => {
        const emptyRow = {} as TData;
        Object.keys(emptyRow).forEach((key) => {
            emptyRow[key as keyof TData] = '' as any; 
        });
        return emptyRow;
    };

    const handleAddRow = () => {
        const newRow = createEmptyRow();
        setTableData([newRow, ...tableData]);
        setEditedData([newRow, ...editedData]);
    };

    const hasErrors = Object.values(error).some(error => error !== '');

    return (
        <div>
            <div className="flex justify-end p-2">
                <IconButton color="primary" onClick={handleAddRow}>
                    <PlusIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleSave} disabled={hasErrors}>
                    <SaveIcon />
                </IconButton>
            </div>
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
                                    style={{ height: '56px', padding: 0 }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'
                                }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            onClick={() => handleCellClick(row.id, cell.column.id as keyof TData)}
                                            style={{
                                                width: '300px',
                                                height: '56px',
                                                padding: 0,
                                                backgroundColor: editedCells[`${row.id}-${cell.column.id}`]
                                                    ? (error[`${row.id}-${cell.column.id}`] ? 'lightcoral' : 'lightgreen')
                                                    : 'inherit'
                                            }}
                                        >
                                            {editingCell.rowId === row.id && editingCell.cellId === cell.column.id ? (
                                                <>
                                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TextField
                                                        value={cell.getValue() as string | number}
                                                        variant="filled"
                                                        size="medium"
                                                        onChange={(e) => handleInputChange(e, row.id, cell.column.id as keyof TData)}
                                                        onBlur={handleBlur}
                                                        sx={{ width: '300px', height: '56px', padding: 0,
                                                            '& .MuiFilledInput-root': {
                                                                backgroundColor: editedCells[`${row.id}-${cell.column.id}`]
                                                                ? (error[`${row.id}-${cell.column.id}`] ? 'lightcoral' : 'lightgreen')
                                                                : 'white',
                                                            } }}
                                                        InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 14, backgroundColor: editedCells[`${row.id}-${cell.column.id}`]
                                                                ? (error[`${row.id}-${cell.column.id}`] ? 'lightcoral' : 'lightgreen')
                                                                : 'white', marginLeft: 16, marginBottom: 50}
                                                            }}
                                                    />
                                                    </Box>
                                                    {error[`${row.id}-${cell.column.id}`] && (
                                                    <Button variant="contained" sx={{ backgroundColor: '#d32f2f', color: '#fff', position: 'absolute'}}>
                                                        {error[`${row.id}-${cell.column.id}`]}
                                                    </Button>
                                                    )}
                                                </>
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
                        onClick={() => setPageIndex(pageIndex - 1)}
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
