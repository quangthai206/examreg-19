const express = require('express');
const adminController = require('./../controllers/adminController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.patch('/students/updatePassword', authController.protect, authController.updatePassword);

router
    .route('/')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getHomepage)
router
    .route('/students/signup')
    .post(authController.signup);

router
    .route('/students')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageStudents)
    .post(adminController.createStudent);

router.post('/students/import', adminController.importStudents);

router
    .route('/students/:id')
    .get(adminController.getStudent)
    .patch(adminController.updateStudent)
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteStudent);
router
    .route('/getAllStudents')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllStudents);

router
    .route('/rooms')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageRooms)
    .post(adminController.createRoom);

router
    .route('/rooms/:id')
    .patch(adminController.updateRoom)
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteRoom);

router
    .route('/getAllRooms')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllRooms);

router
    .route('/courses')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageCourses)
    .post(adminController.createCourse);

router
    .route('/courses/:id')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getCourse)
    .patch(adminController.updateCourse)
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteCourse);

router
    .route('/courses/:id/getAllStudents')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllStudentsCourse)


router
    .route('/courses/:id/deleteAllStudents')
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteAllStudentsCourse)

router
    .route('/courses/:id/importRegister')
    .post(authController.protect, authController.restrictTo('admin'), adminController.importRegister)

router
    .route('/courses/:id/importNotRegister')
    .post(authController.protect, authController.restrictTo('admin'), adminController.importNotRegister)

router
    .route('/getAllCourses')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllCourses);

router
    .route('/semesters')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageSemesters)
    .post(adminController.createSemester)

router
    .route('/semesters/:id')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getSemester)
    .patch(adminController.updateSemester)
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteSemester);

router
    .route('/semesters/:id/getAllExamDates')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllExamDates)

router
    .route('/semesters/:id/examDates')
    .post(authController.protect, authController.restrictTo('admin'), adminController.createExamDates)

router
    .route('/semesters/:id/calendars')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageCalendars)
    .post(authController.protect, authController.restrictTo('admin'), adminController.createCalendar)

router
    .route('/calendars/:id/students')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getStudentsByCalendar)

router
    .route('/semesters/:id/calendars/:calendarId')
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteExamCalendar)
    .patch(authController.protect, authController.restrictTo('admin'), adminController.updateExamCalendar)

router
    .route('/semesters/:id/getAllExamCalendars')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllExamCalendars)

router
    .route('/examdates/:id')
    .patch(adminController.updateExamDate)
    .delete(authController.protect, authController.restrictTo('admin'), adminController.deleteExamDate);

router
    .route('/getAllSemesters')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllSemesters);

module.exports = router;