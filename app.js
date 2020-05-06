const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');

const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const studentRouter = require('./routes/studentRoutes');
const authController = require('./controllers/authController');

const mongoose = require('mongoose');
const User = require('./models/userModel');
const Register = require('./models/registerModel');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.set('layout extractScripts', true)
// app.set('layout extractStyles', true)

// app.use(expressLayouts);

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from the body into req.body
app.use(express.json());
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


// 2) ROUTES
app.post("/import", (req, res) => {
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
            })
        })

        res.status(200).json({
            countFail: docs.length
        })
    });

});

app.get("/test", (req, res) => {
    // ExamCalendar.find({
    //     semester: "5e00a489fc8e1b1cdd306f8f"
    // }, (err, docs) => {
    //     res.json({
    //         data: docs
    //     })
    // })


    let r = new Register({
        student: mongoose.Types.ObjectId("5e00e0890a550c63c334c0be"),
        examCalendar: mongoose.Types.ObjectId("5e011c6ca0edc1598a6aff55"),
    });
    r.save((err, doc) => {
        res.json({
            data: doc
        })
    })

});

app.get("/testcreate", (req, res) => {
    let stu = new User({
        sid: "admin",
        name: "quangthai206",
        email: "admin" + "@examreg.com",
        password: "123456",
        passwordConfirm: "123456"
    });
    stu.save((err, doc) => {
        if (err) console.log(err);
    });
    res.status(200).json({
        message: "Add successfully!"
    });
})

app.get("/login", (req, res) => {
    res.render('account/login');
});
app.get("/", (req, res) => {
    res.render('account/login');
});
app.post("/login", authController.login);
app.get("/logout", authController.logout);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

app.all("*", (req, res, next) => {
    // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    res.render('account/error');
});

app.use(globalErrorHandler);

module.exports = app;