const express = require('express');
const studentController = require('./../controllers/studentController');
const authController = require('./../controllers/authController');

const router = express.Router();


router
    .route('/')
    .get(authController.protect, authController.restrictTo('student'), studentController.sayHelloStudent);

router
    .route('/register')
    .get(authController.protect, authController.restrictTo('student'), studentController.manageRegister);

router
    .route('/register/:id')
    .get(authController.protect, authController.restrictTo('student'), studentController.registerCourse);
router
    .route('/register/:id/getAllCalendars')
    .get(authController.protect, authController.restrictTo('student'), studentController.getAllCalendars);

router
    .route('/results')
    .get(authController.protect, authController.restrictTo('student'), studentController.getResults);

module.exports = router;