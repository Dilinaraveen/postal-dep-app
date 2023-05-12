import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";

const FinePaymentDetails = () => {
    const [payments, setPayments] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/fines")
      .then(({ data }) => {
        setPayments(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="paymentdetails-container">
        <h2>Fine Payments</h2>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">License Number</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">File URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((e) => (
              <TableRow
                key={e._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{e.licenseNo}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.paymentDate}</TableCell>
                <TableCell align="center"><a href={e.photo} target="_blank">Click to View</a> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  )
}

export default FinePaymentDetails
