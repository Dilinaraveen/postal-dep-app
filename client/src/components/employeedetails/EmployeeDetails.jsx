import "../employeedetails/employeedetails.css";
import AddEmployee from "../addemployee/AddEmployee";
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
import { useEffect, useState } from "react";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/employees")
      .then(({ data }) => {
        setEmployee(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [toggle]);

  return (
    <div className="employee-container">
      <div className="employee-container-header">
        <h2>Employee Details</h2>
        <AddEmployee toggle={toggle} setToggle={setToggle}/>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Job Title</TableCell>
              <TableCell align="center">Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((e) => (
              <TableRow
                key={e._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{e.firstName}</TableCell>
                <TableCell align="center">{e.lastName}</TableCell>
                <TableCell align="center">{e.email}</TableCell>
                <TableCell align="center">{e.phoneNumber}</TableCell>
                <TableCell align="center">{e.jobTitle}</TableCell>
                <TableCell align="center">{e.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeDetails;
