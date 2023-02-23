import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddExpense from '../components/addExpense';
import { baseUrl } from '../utils/constants';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { HiOutlineMenuAlt1, } from "react-icons/hi"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Expenses() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, sortable: false },
        { field: 'name', headerName: 'Expense Name', width: 130, sortable: false },
        { field: 'desc', headerName: 'Description', width: 130, sortable: false },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 90, sortable: true },
        { field: 'transactionAccount', headerName: 'Transaction Account', width: 90, sortable: false },
        { field: 'transactionDetails', headerName: 'Transaction Details', width: 90, sortable: false },
        { field: 'type', headerName: 'Expense/Income', width: 90, sortable: true, },
        { field: 'creator', headerName: 'UserId', width: 90, sortable: false },
        { field: 'createdAt', headerName: 'Created', width: 90, sortable: true, },
        { field: 'updatedAt', headerName: 'Updated', width: 90, sortable: true, },
        { field: 'edit', headerName: 'Edit', width: 90, renderCell: () => <HiOutlineMenuAlt1 onClick={handleClick} /> },
    ];
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [modalData,setModalData] = useState({
        action:"ADD",
        url:baseUrl+"/expenses/add",
    })
    const handleClickOpen = (event) => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const fetchExpenses = async () => {
        try {
            const url = baseUrl + "/expenses";
            const loginToken = localStorage.getItem("token");
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + loginToken
                }
            });
            setExpenses(data.map(e => ({ ...e, id: e._id })));
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        try {
            const loginToken = localStorage.getItem("token");
            const deleteUrl = baseUrl + "/expenses/delete/"+selected[0]._id;
            const {data} = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: "Bearer "+ loginToken
                }
            })
            if(typeof data === "object") fetchExpenses();
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = () => {
        setModalData({
            action:"EDIT",
            url:baseUrl+"/expenses/update/"+selected[0]._id,
        })
        handleClickOpen();
    }
    const handleAdd = () => {
        setModalData({
            action:"ADD",
            url:baseUrl+"/expenses/add",
        })
        handleClickOpen();
    }
    useEffect(() => {
        fetchExpenses();
    }, [open])
    return (
        <>
            <Button variant="contained" onClick={handleAdd}>Add Expense</Button>
            <AddExpense open={open} onClose={handleClose} data={modalData}/>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = expenses.filter((row) =>
                            selectedIDs.has(row.id.toString())
                            );
                            setSelected(selectedRowData);
                      }}
                />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEdit}>Edit  </MenuItem>
                <MenuItem onClick={handleDelete}>Delete </MenuItem>
            </Menu>
        </>
    )
}
