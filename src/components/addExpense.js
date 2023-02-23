import { FormGroup, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Button,Dialog } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState, useRef } from 'react'
import axios from "axios";
import "../styles/addExpense.scss";
import { baseUrl } from '../utils/constants';

export default function AddExpense({ open, onClose, data:modalData }) {

    const [expenseType, setExpenseType] = useState("");
    const [expenseData, setExpenseData] = useState("");
    const formRef = useRef();
    const handleAddExpense = async (event) => {
        event.preventDefault();
        const form = formRef.current;
        const data = {};
        data[form.name.name] = form.name.value;
        data[form.desc.name] = form.desc.value;
        data[form.transactionDetails.name] = form.transactionDetails.value;
        data[form.transactionAccount.name] = form.transactionAccount.value;
        data[form.amount.name] = form.amount.value;
        data["type"] = expenseType;
        console.log(data);
        const url = modalData.url;
        try {
            const loginToken = localStorage.getItem("token");
            switch(modalData.action) {
                case "ADD" : const { data: postData } = await axios.post(url, data, {
                    headers: {
                        Authorization: "Bearer " + loginToken
                    }
                })
        
                console.log(postData);
                setExpenseData(postData);
                onClose(false);
                break;
                case "EDIT": const { data: editData } = await axios.put(url, data, {
                    headers: {
                        Authorization: "Bearer " + loginToken
                    }
                })
        
                console.log(editData);
                setExpenseData(editData);
                onClose(false);
                break;
                default: break;
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const handleClose = () => {
        onClose(false);
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <Container maxWidth="lg">
                <h3 className='expense-form-title'>Add Expense</h3>
                <form className='expense-form' ref={formRef}>
                    <TextField className='expense-form-items' type="text" variant="outlined" name='name' label="Name" required />
                    <TextField className='expense-form-items' type="text" variant="outlined" name='desc' label="Description" required />
                    <TextField className='expense-form-items' type="text" variant="outlined" name='transactionDetails' label="Details" required />
                    <TextField className='expense-form-items' type="text" variant="outlined" name='transactionAccount' label="Account" required />
                    <TextField className='expense-form-items' type="text" variant="outlined" name='amount' label="amount" required />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={expenseType}
                            label="Age"
                            onChange={(e) => setExpenseType(e.target.value)}
                        >
                            <MenuItem value={"income"}>Income</MenuItem>
                            <MenuItem value={"expense"}>Expense</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <TextField type="file" variant="outlined" name='img' label="img" required/> */}
                    <Button className='expense-form-items' type='submit' color='primary' variant='contained' onClick={handleAddExpense}>Add</Button>
                </form>
            </Container>
        </Dialog>
    )
}
