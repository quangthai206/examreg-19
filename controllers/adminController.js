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

exports.sayHelloAdmin = (req, res) => {
    res.send("Hello Admin");
};

exports.createStudent = (req, res) => {

    User.findOne({
        sid: req.body.sid
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        }
        if (!doc) {
            let stu = new User({
                sid: req.body.sid,
                name: req.body.name,
                email: req.body.sid + "@examreg.com",
                birthday: req.body.birthday,
                class: req.body.class,
                password: "123456",
                passwordConfirm: "123456"
            });
            stu.save((err, doc) => {
                if (err) {
                    return res.status(200).json({
                        status: "fail",
                        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Thêm mới thành công!"
                    })
                }
            })

        } else {
            return res.status(200).json({
                status: "fail",
                message: "Thất bại! Mã sinh viên đã tồn tại"
            })
        }
    })
};

exports.createRoom = (req, res) => {
    Room.findOne({
        roomId: req.body.roomId
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        }
        if (!doc) {
            let room = new Room(req.body);
            room.save((err, doc) => {
                if (err) {
                    return res.status(200).json({
                        status: "fail",
                        message: "Thất bại! Phòng thi đã tồn tại"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Thêm mới thành công!"
                    })
                }
            })

        } else {
            return res.status(200).json({
                status: "fail",
                message: "Thất bại! Phòng thi đã tồn tại"
            })
        }

    })
}

exports.createCourse = (req, res) => {
    Course.findOne({
        courseId: req.body.courseId
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        }
        if (!doc) {
            let course = new Course(req.body);
            course.save((err, doc) => {
                if (err) {
                    return res.status(200).json({
                        status: "fail",
                        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Thêm mới thành công!"
                    })
                }
            })

        } else {
            return res.status(200).json({
                status: "fail",
                message: "Thất bại! Học phần đã tồn tại"
            })
        }

    })
}

exports.createSemester = (req, res) => {
    Semester.findOne({
        semesterId: req.body.semesterId
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        }
        if (!doc) {
            let semester = new Semester(req.body);
            semester.save((err, doc) => {
                if (err) {
                    return res.status(200).json({
                        status: "fail",
                        message: "Thất bại! Kỳ thi đã tồn tại"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Thêm mới thành công!"
                    })
                }
            })

        } else {
            return res.status(200).json({
                status: "fail",
                message: "Thất bại! Kỳ thi đã tồn tại"
            })
        }

    })
}

exports.createExamDates = (req, res) => {
    Semester.findOne({
        semesterId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {
            let ed = new ExamDate({
                dateId: req.body.dateId,
                eDate: req.body.eDate,
                eTime: req.body.eTime,
                semester: doc._id
            });
            ed.save(err => {
                if (err) {
                    res.status(200).json({
                        status: "fail",
                        message: "Thất bại! Mã ca thi đã tồn tại"
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Thêm ca thi thành công!"
                    });
                }
            })

        }
    })
}

exports.createCalendar = (req, res) => {
    Semester.findOne({
        semesterId: req.params.id
    }, (err, doc) => {
        let ec = new ExamCalendar({
            examDate: mongoose.Types.ObjectId(req.body.dateId),
            room: mongoose.Types.ObjectId(req.body.roomId),
            course: mongoose.Types.ObjectId(req.body.courseId),
            semester: doc._id,
            duration: req.body.duration
        });
        ec.save((err, doc) => {
            if (err) {
                return res.status(200).json({
                    status: "fail",
                    message: "Thất bại! Lịch thi đã tồn tại"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Tạo lịch thi thành công"
                })
            }
        })
    })

}

exports.manageStudents = (req, res) => {
    res.render('admin/manageStudents');
}

exports.manageRooms = (req, res) => {
    res.render('admin/manageRooms');
}

exports.manageCourses = (req, res) => {
    res.render('admin/manageCourses');
}

exports.manageSemesters = (req, res) => {
    res.render('admin/manageSemesters');
}

exports.manageCalendars = (req, res) => {
    // console.log(req.params.id);
    Semester.findOne({
        semesterId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {
            // Lấy dữ liệu course, examDate, room của semesterId
            Course.find((err, courses) => {
                Room.find((err, rooms) => {
                    ExamDate.find({
                        semester: doc._id
                    }, (err, eds) => {
                        // console.log(courses);
                        // console.log(rooms);
                        // console.log(eds);
                        res.render('admin/manageCalendars', {
                            semesterId: doc.semesterId,
                            semesterName: doc.name,
                            courses: courses,
                            rooms: rooms,
                            eds: eds
                        });
                    })
                })
            })


        }
    });
}

exports.getAllStudents = catchAsync(async (req, res, next) => {
    // // BUILD QUERY
    // const queryObj = {
    //     ...req.query
    // };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach(el => delete queryObj[el]);

    const query = User.find({
        role: "student",
        active: true
    });
    // const query = Student.find().where('name').equals('Lai Quang Thai');

    // EXECUTE QUERY
    const students = await query;

    // SEND RESPONSE
    res.status(200).json({
        data: students
    });

});

exports.getAllRooms = (req, res) => {

    Room.find((err, rooms) => {
        res.status(200).json({
            data: rooms
        })
    })

};

exports.getAllCourses = (req, res) => {

    Course.find((err, courses) => {
        res.status(200).json({
            data: courses
        })
    });

};

exports.getAllSemesters = (req, res) => {

    Semester.find((err, semesters) => {
        res.status(200).json({
            data: semesters
        })
    });

};


exports.getAllExamDates = (req, res) => {
    // semeterId = res.params.id
    Semester.findOne({
        semesterId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {
            ExamDate.find({
                semester: doc._id
            }, (err, results) => {
                // console.log(results);
                res.status(200).json({
                    data: results
                })
            })
        }
    })

};

exports.getAllExamCalendars = (req, res) => {
    // semeterId = res.params.id
    Semester.findOne({
        semesterId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {
            ExamCalendar.find({
                semester: doc._id
            }, (err, results) => {
                // console.log(results);
                res.status(200).json({
                    data: results
                })
            })
        }
    })

};



exports.getAllStudentsCourse = (req, res) => {
    Course.findOne({
        courseId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {

            StudentCourse.find({
                course: doc._id
            }, (err, results) => {
                // console.log(results);

                res.status(200).json({
                    data: results
                })
            });
        }
    })

};

exports.deleteAllStudentsCourse = (req, res) => {
    Course.findOne({
        courseId: req.params.id
    }, (err, doc) => {
        if (!doc) {
            return res.render('account/error');
        } else {

            StudentCourse.deleteMany({
                course: doc._id
            }, function (err) {
                res.status(200).json({
                    status: "success",
                    message: "Xóa dữ liệu hoàn tất!"
                })
            });
        }
    })

};

exports.getCourse = (req, res) => {

    const courseId = req.params.id;
    Course.findOne({
        courseId: req.params.id
    }, (err, course) => {
        if (err || !course) {
            return res.render('account/error');
        } else {
            res.render('admin/courseDetail', {
                courseId: course.courseId,
                courseName: course.name
            })
        }
    })

};

exports.getSemester = (req, res) => {

    Semester.findOne({
        semesterId: req.params.id
    }, (err, semester) => {
        if (err || !semester) {
            return res.render('account/error');
        } else {
            res.render('admin/semesterDetail', {
                semesterId: semester.semesterId,
                semesterName: semester.name
            })
        }
    })

};



exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await User.findById(req.params.id);

    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            student
        }
    });


});

exports.updateStudent = (req, res, next) => {
    User.findOneAndUpdate({
        sid: req.params.id
    }, req.body, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật thành công!"
            })
        }
    })

};

exports.updateRoom = (req, res, next) => {
    Room.findOneAndUpdate({
        roomId: req.params.id
    }, req.body, (err, doc) => {
        if (err) {
            console.log(err);

            res.status(200).json({
                status: "fail",
                message: "Thất bại! Phòng thi đã tồn tại"
            })
        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật thành công!"
            })
        }
    })

};

exports.updateCourse = (req, res, next) => {
    Course.findOneAndUpdate({
        courseId: req.params.id
    }, req.body, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
            })
        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật thành công!"
            })
        }
    })

};

exports.updateSemester = (req, res, next) => {
    Semester.findOneAndUpdate({
        semesterId: req.params.id
    }, req.body, (err, doc) => {
        if (err) {
            if (err.codeName === "DuplicateKey") {
                res.status(200).json({
                    status: "fail",
                    message: "Thất bại! Kỳ thi đã tồn tại"
                })
            } else {
                res.status(200).json({
                    status: "fail",
                    message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
                })
            }

        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật thành công!"
            })
        }
    })

};

exports.updateExamDate = (req, res, next) => {
    ExamDate.findOneAndUpdate({
        dateId: req.params.id
    }, req.body, (err, doc) => {
        if (err) {
            if (err.codeName === "DuplicateKey") {
                res.status(200).json({
                    status: "fail",
                    message: "Thất bại! Mã ca thi đã tồn tại"
                })
            } else {
                res.status(200).json({
                    status: "fail",
                    message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
                })
            }

        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật thành công!"
            })
        }
    })

};

exports.updateExamCalendar = (req, res, next) => {
    // console.log(req.params);
    ExamCalendar.findByIdAndUpdate(req.params.calendarId, req.body, {
        runValidators: true
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                status: "fail",
                message: "Thất bại! Lịch thi đã tồn tại"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Cập nhật lịch thi thành công!"
            })
        }
    })


};

exports.deleteStudent = (req, res) => {
    User.findOneAndRemove({
        sid: req.params.id
    }, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã xảy ra lỗi..."
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa thành công!"
            });
        }
    })
}

exports.deleteRoom = (req, res) => {
    Room.findOneAndRemove({
        roomId: req.params.id
    }, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã xảy ra lỗi..."
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa thành công!"
            });
        }
    })
}

exports.deleteCourse = (req, res) => {
    Course.findOneAndRemove({
        courseId: req.params.id
    }, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã xảy ra lỗi..."
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa thành công!"
            });
        }
    })
}

exports.deleteSemester = (req, res) => {
    Semester.findOneAndRemove({
        semesterId: req.params.id
    }, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã xảy ra lỗi..."
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa kỳ thi thành công!"
            });
        }
    })
}

exports.deleteExamDate = (req, res) => {
    ExamDate.findOneAndRemove({
        dateId: req.params.id
    }, (err, doc) => {
        if (err) {
            res.status(200).json({
                status: "fail",
                message: "Đã xảy ra lỗi..."
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa ca thi thành công!"
            });
        }
    })
}

exports.deleteExamCalendar = (req, res) => {
    // console.log(req.params);
    ExamCalendar.findByIdAndRemove({
        _id: req.params.calendarId
    }, (err, docs) => {
        if (err) {
            return res.render('account/error');
        } else {
            res.status(200).json({
                status: "success",
                message: "Xóa lịch thi thành công!"
            })
        }
    })

}

exports.importStudents = (req, res) => {
    const arr = req.body;
    const sidArr = arr.map(el => el.ID);
    User.find({
        'sid': {
            $in: sidArr
        }
    }, function (err, docs) {
        // IMPORT HERE...
        arr.forEach(item => {
            let stu = new User({
                sid: item.ID,
                name: item.Name,
                email: item.ID + "@examreg.com",
                birthday: item.Birthday,
                class: item.Class,
                password: "123456",
                passwordConfirm: "123456"
            });
            stu.save((err, doc) => {
                if (err) console.log(err);
            });
        });

        res.status(200).json({
            countFail: docs.length
        });
    });
}

exports.importRegister = (req, res) => {
    let students = req.body;
    Course.findOne({
        courseId: req.params.id
    }, (err, course) => {
        students.forEach(item => {
            User.findOne({
                sid: item.ID
            }, (err, stu) => {
                // Tìm thấy sinh viên
                if (stu) {
                    let sc = new StudentCourse({
                        student: stu._id,
                        course: course._id,
                        status: true
                    });
                    sc.save(err => {
                        console.log(err);
                    });
                }
                // Sinh viên chưa có tài khoản
                else {
                    let newStudent = new User({
                        sid: item.ID,
                        name: item.Name,
                        email: item.ID + "@examreg.com",
                        birthday: item.Birthday,
                        class: item.Class,
                        password: "123456",
                        passwordConfirm: "123456"
                    });
                    newStudent.save((err, result) => {
                        if (result) {
                            let sc = new StudentCourse({
                                student: result._id,
                                course: course._id,
                                status: true
                            });
                            sc.save(err => {
                                console.log(err);
                            });
                        }
                    })
                }
            })
        });

        // Response
        res.status(200).json({
            status: 'success',
            message: 'Dữ liệu đã được thêm thành công!'
        });
    })
}

exports.importNotRegister = (req, res) => {
    let students = req.body;
    Course.findOne({
        courseId: req.params.id
    }, (err, course) => {
        students.forEach(item => {
            User.findOne({
                sid: item.ID
            }, (err, stu) => {
                // Tìm thấy sinh viên
                if (stu) {
                    let sc = new StudentCourse({
                        student: stu._id,
                        course: course._id,
                        status: false
                    });
                    sc.save(err => {
                        console.log(err);
                    });
                }
                // Sinh viên chưa có tài khoản
                else {
                    let newStudent = new User({
                        sid: item.ID,
                        name: item.Name,
                        email: item.ID + "@examreg.com",
                        birthday: item.Birthday,
                        class: item.Class,
                        password: "123456",
                        passwordConfirm: "123456"
                    });
                    newStudent.save((err, result) => {
                        if (result) {
                            let sc = new StudentCourse({
                                student: result._id,
                                course: course._id,
                                status: false
                            });
                            sc.save(err => {
                                console.log(err);
                            });
                        }
                    })
                }
            })
        });

        // Response
        res.status(200).json({
            status: 'success',
            message: 'Dữ liệu đã được thêm thành công!'
        });
    })
}

exports.getHomepage = (req, res) => {
    res.redirect("/admin/semesters");
}

exports.getStudentsByCalendar = (req, res) => {
    // calendarId = req.params.id
    ExamCalendar.findById(req.params.id, (err, doc) => {
        // console.log(doc);

        res.render('admin/studentsByCalendar', {
            calendar: doc
        })

    });

}