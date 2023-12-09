import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import Button from "react-bootstrap/Button";
import {updateInvoices} from "../redux/invoicesSlice";

const BulkEdit = () => {
    const dispatch = useDispatch();
    const invData = useSelector((store) => store.invoices);
    const [editableData, setEditableData] = useState(invData);

    const handleEditClick = (id) => {
        setEditableData((prev) =>
            prev.map((item) => (item.id === id ? {...item, isEditing: true} : item))
        );
    }

    const handleCancelEditClick = (id) => {
        setEditableData((prev) =>
            prev.map((item) => (item.id === id ? {...item, isEditing: false} : item))
        );
    };

    const handleSaveClick = () => {
        setEditableData((prev) =>
            prev.map((item) => ({...item, isEditing: false}))
        );
        const updatedInvoices = editableData.map((item) => ({...item, isEditing: false}));
        dispatch(updateInvoices(updatedInvoices));
    };

    const rows = editableData.map((item) => (
        <TableRow key={item.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            {Object.keys(item)
                .filter((key) => key !== 'items')
                .filter((key) => key !== 'isEditing')
                .map((key) => (
                    <TableCell align="left" key={key}>
                        <div style={{width: 180}}>
                            {item.isEditing && key !== 'id' && key !== 'currency' ? (
                                <TextField
                                    style={{width: '100%', padding: 0}}
                                    multiline={true}
                                    value={item[key]}
                                    onChange={(e) =>
                                        setEditableData((prev) =>
                                            prev.map((rowData) =>
                                                rowData.id === item.id ? {
                                                    ...rowData,
                                                    [key]: e.target.value
                                                } : rowData
                                            )
                                        )
                                    }
                                />
                            ) : (
                                String(item[key])
                            )}
                        </div>
                    </TableCell>
                ))}
            <TableCell align="right">
                <Button onClick={() => handleEditClick(item.id)}>Edit</Button>
            </TableCell>
        </TableRow>
    ));

    return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                marginTop: 10,
                marginBottom: 10,
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <Button onClick={handleSaveClick}>Save All</Button>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: '700'}} align="left">Id</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Current Date</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Invoice Number</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Date Of Issue</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill To</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill To Email</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill To Address</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill From</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill From Email</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Bill From Address</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Notes</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Total</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Sub Total</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Tax Rate</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Tax Amount</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Discount Rate</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Discount Amount</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Currency</TableCell>
                            <TableCell style={{fontWeight: '700'}} align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BulkEdit;


