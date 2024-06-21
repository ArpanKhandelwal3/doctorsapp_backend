const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const news = require('../controllers/newsController')


router.post('/newsentry',jwt.checkJwt,news.addNews)
router.get('/latestnews',news.getNews)



module.exports = router;