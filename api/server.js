const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require('multer');
const path = require('path');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
      cb(null,"images");
  },filename:(req,file,cb) =>{
      cb(null,req.body.name);
  }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res) =>{
  res.status(200).json("File has been uploaded.");
})

app.use(cors());
app.use(express.json());
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/parcels", require("./routes/parcelRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/fines", require("./routes/fineRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/checkout", require("./routes/stripe"))
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
