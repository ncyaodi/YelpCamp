
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const Campground = require('../models/campground');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });


const Joi = require('joi');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');




router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground));


// .post(upload.single('image'), (req, res) => {  //image is the "name" feature in the form.
//     console.log(req.body, req.file);
//     res.send('It worked!')
// });


router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm));


router.get('/:id', catchAsync(campgrounds.renderCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderCampgroundEdit));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), catchAsync(campgrounds.editCampground));
// router.post('/:id', isLoggedIn, isAuthor, upload.array('image'), catchAsync(campgrounds.editCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;
