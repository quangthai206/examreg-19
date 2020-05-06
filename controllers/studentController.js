const User = require('./../models/userModel');
const Room = require('./../models/roomModel');
const Course = require('./../models/courseModel');
const StudentCourse = require('./../models/studentCourseModel');
const Semester = require('./../models/semesterModel');
const ExamDate = require('./../models/examDateModel');
const ExamCalendar = require('./../models/examCalendar');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');
const Register = require('./../models/registerModel');

exports.sayHelloStudent = (req, res) => {
	res.redirect('/student/register');
}

exports.manageRegister = (req, res) => {
	console.log(req.user._id);
	StudentCourse.find({
		student: req.user._id
	}, (err, docs) => {
		if (err) {
			return res.render('account/error');
		} else {
			console.log(docs);
			res.render('student/manageRegister', {
				courses: docs,
				i: 1,
				j: 1
			});

		}
	})

}

exports.registerCourse = (req, res) => {
	// console.log(req.params);
	Course.findById(req.params.id, (err, doc) => {
		res.render('student/registerDetail', {
			courseId: doc.courseId,
			courseName: doc.name,
			course_id: doc._id
		});
	})
}

exports.getAllCalendars = (req, res) => {
	// req.params.id = course_id
	ExamCalendar.find({
		course: req.params.id
	}, (err, docs) => {
		if (err) {
			return res.render('account/error');
		} else {
			// docs.forEach(doc => {
			// 	Register.find({
			// 		examCalendar: doc._id
			// 	}, (err, records) => {
			// 		console.log(records.length);

			// 		doc._v = 20;
			// 	})
			// });

			res.status(200).json({
				data: docs
			})
		}
	})

}

exports.getResults = (req, res) => {
	res.render('student/results');
}