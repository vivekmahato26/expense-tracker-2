import { FormGroup, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Button } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'

import "../styles/addExpense.scss";

export default function AddExpense() {

    const [expenseType,setExpenseType] = useState("");


    return (
        <Container maxWidth="lg">
            <h3 className='expense-form-title'>Add Expense</h3>
            <FormGroup className='expense-form'>
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
                        onChange={(e)=>setExpenseType(e.target.value)}
                    >
                        <MenuItem value={"income"}>Income</MenuItem>
                        <MenuItem value={"expense"}>Expense</MenuItem>
                    </Select>
                </FormControl>
                {/* <TextField type="file" variant="outlined" name='img' label="img" required/> */}
                <Button className='expense-form-items' type='submit' color='primary' variant='contained'>Add</Button>
            </FormGroup>
        </Container>
    )
}
