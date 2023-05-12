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

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/payments")
      .then(({ data }) => {
        setPayments(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="paymentdetails-container">
        <h2>Payment Details</h2>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NIC Number</TableCell>
              <TableCell align="center">Service Provider</TableCell>
              <TableCell align="center">Account Number</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((e) => (
              <TableRow
                key={e._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {e.nicNo}
                </TableCell>
                <TableCell align="center">{e.serviceProvider}</TableCell>
                <TableCell align="center">{e.accNo}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.paymentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentDetails;
