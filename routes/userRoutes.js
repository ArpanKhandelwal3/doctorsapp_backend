const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('../middleware/jwt')
const user = require('../controllers/userController')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Specify the directory where the uploaded files will be stored
        cb(null, './uploads');
      },
      filename: function(req, file, cb) {
        // Specify a unique filename for uploaded files
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
});

const uploadImage = multer({ storage: storage });

router.post('/register',user.register)
router.post('/login',user.login)
router.post('/sendotp',user.sendOtp)
router.post('/resendotp',user.resendOtp)
router.post('/verifyOtp',user.verifyOtp)
router.get('/userdetails',jwt.checkJwt,user.userDetails)
router.patch('/updatedetails',jwt.checkJwt,uploadImage.single('profile_image'),user.updateDetails)
//thus api will change the password.
router.post('/changePassword',user.changePassword)
//this api will send the otp when user tries to change the password.
router.post('/sendOtppassword',user.sendOtppassword)  


module.exports = router;