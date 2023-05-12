import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Services from "./pages/Services/Services";
import BillPayment from "./pages/BillPayment/BillPayment";
import ParcelTracking from "./pages/ParcelTracking/ParcelTracking";
import Login from "./pages/Login/Login";
import Success from "./pages/Success/Success";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import { useDispatch, useSelector } from "react-redux";
import FinePayment from "./pages/FinePayment/FinePayment";
import Register from "./pages/Register/Register";


function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const isAdmin = window.localStorage.getItem("isAdmin");

  return (
    <div>
      
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/services" element={loggedIn ? <Services /> : <Navigate to='/login'/>} />
            <Route path="/billpayment" element={loggedIn ? <BillPayment /> : <Navigate to='/login'/>} />
            <Route path="/finepayment" element={loggedIn ? <FinePayment /> : <Navigate to='/login'/>} />
            <Route path="/parceltracking" element={<ParcelTracking />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {loggedIn && (
              <Route path="/dashbaord" element={<AdminDashboard />} />
            )}
            {loggedIn && (
              <Route path="/createorder" element={<CreateOrder />} />
            )}
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
