import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmployeeDetails from "../../components/employeedetails/EmployeeDetails";
import OrderDetails from "../../components/orderdetails/OrderDetails";
import PaymentDetails from "../../components/paymentdetails/PaymentDetails";
import FinePaymentDetails from "../../components/finepaymentdetails/FinePaymentDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop:'30px' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Order Details" {...a11yProps(0)} />
          <Tab label="Employee Details" {...a11yProps(1)} />
          <Tab label="Payment Details" {...a11yProps(2)} />
          <Tab label="Fines Payments" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeDetails />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PaymentDetails />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FinePaymentDetails />
      </TabPanel>
    </Box>
  );
}
