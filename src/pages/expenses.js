import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddExpense from '../components/addExpense';
import { baseUrl } from '../utils/constants';
import axios from 'axios';

export default function Expenses() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const fetchExpenses = async () => {
        try {
            const url = baseUrl + "/expenses";
            const loginToken = localStorage.getItem("token");
            const {data} = await axios.get(url,{
                headers: {
                    Authorization: "Bearer "+ loginToken
                }
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchExpenses();
    },[open])
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Add Expense</Button>
            <AddExpense open={open} onClose={handleClose} />
        </>
    )
}
