const express = require('express');
const mongoose= require('mongoose');
const userRoutes = require('./routes/userRoutes');
const newRoutes = require('./routes/newRoute')
const adminRoutes = require('./routes/adminRoute')
const patientRoutes = require('./routes/patientRoute')
const doctorRoutes = require('./routes/doctorRoute')
const cors = require("cors");
const app = express();
const PORT = 8000;




app.use(cors());
app.use(express.json());
app.use(express.static('upload'));
app.use(userRoutes);
app.use(newRoutes);
app.use(adminRoutes);
app.use(doctorRoutes)
app.use(patientRoutes)

app.all('*',(req,res)=>{
    res.status(404).send({"message":`not a valid url ${req.originalUrl}`})
})

mongoose.connect("mongodb+srv://ravibro808:XWtmPbjgw2jHYwrR@cluster0.wd3puim.mongodb.net/doctorsapp?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})

app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})