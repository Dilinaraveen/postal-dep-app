import React, { useEffect, useState } from "react";
import {
    IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import EditOrderDetails from "../editorderdetails/EditOrderDetails";


const OrderDetails = () => {
  const [parcels, setParcels] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/parcels")
      .then(({ data }) => {
        setParcels(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [toggle]);
  return (
    <>
      <h2>Order Details</h2>
      <TableContainer  component={Paper}>
        <Table sx={{ width: '100px' }}  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tracking Number</TableCell>
              <TableCell align="center">Sender's Name</TableCell>
              <TableCell align="center">Sender's Phone No</TableCell>
              <TableCell align="center">Sender's Address</TableCell>
              <TableCell align="center">Reciever's Name</TableCell>
              <TableCell align="center">Reciever's Phone No</TableCell>
              <TableCell align="center">Reciever's Address</TableCell>
              <TableCell align="center">Parcel Loaction</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parcels.map((e) => (
              <TableRow
                key={e._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {e.trackingNo}
                </TableCell>
                <TableCell align="center">{e.senderName}</TableCell>
                <TableCell align="center">{e.senderPhone}</TableCell>
                <TableCell align="center">{e.senderAddress}</TableCell>
                <TableCell align="center">{e.recieverName}</TableCell>
                <TableCell align="center">{e.recieverPhone}</TableCell>
                <TableCell align="center">{e.recieverAddress}</TableCell>
                <TableCell align="center">{e.parcelLocation}</TableCell>
                <TableCell align="center">{e.status}</TableCell>
                <TableCell align="center">
                  <EditOrderDetails order={e} setToggle={setToggle} toggle={toggle}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderDetails;
