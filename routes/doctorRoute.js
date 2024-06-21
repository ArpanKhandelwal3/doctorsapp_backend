const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const doctor = require("../controllers/doctorController")


router.post("/submitdoctoravailability",jwt.checkJwt,doctor.submitDoctorAvailability)
router.get("/getCurrentBookings",jwt.checkJwt,doctor.getCurrentBookings)



module.exports=router