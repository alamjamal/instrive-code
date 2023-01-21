const express = require('express');
const router = express.Router();


const control= require('../controller/user.controller');

// const { uploadSingleFile } = require('../middleware/upload');





// router.get('/view', userController.getUser )
router.post('/create', control.uploadSingleFilee)

router.post('/uploadDB', control.uploadDB)


// router.patch('/update/:id', userController.updateUser )





module.exports = router;