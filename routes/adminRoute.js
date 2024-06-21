const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const admin = require("../controllers/adminController")


router.get('/getApprovalRequestList',jwt.checkJwt,admin.getApprovalRequestList)
router.patch('/approveDoctor',jwt.checkJwt,admin.approveDoctor)
router.get('/getdoctordetails/:id',jwt.checkJwt,admin.getDoctorDetails)
router.get('/getTotalPatientByDoctor',jwt.checkJwt,admin.getTotalPatientByDoctor)
router.get('/getTotalPAtientByDate',jwt.checkJwt,admin.getTotalPAtientByDate)


module.exports = router;