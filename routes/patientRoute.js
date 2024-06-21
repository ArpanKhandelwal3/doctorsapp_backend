const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const patient = require('../controllers/patientController')


router.get('/getapproveddoctors',patient.getApprovedDoctors)
router.get('/getdoctoravailability',patient.getDoctorAvailablity)
router.get('/getalreadybookedslots',patient.getAlreadyBookedslots)
router.post('/submitbookings',jwt.checkJwt,patient.submitBookings)



module.exports=router;
