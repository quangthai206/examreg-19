# examreg-19

Web application for exam registration in school.   
This project is a final assignment I developed while studying web development at university.

## Exam description

The ABC University (ABCUni) organizes the final examination in the form of multiple-choice tests on computers. To create the best conditions for candidates, ABCUni allows students to register for the exam. 
Accordingly, ABCUni will schedule examinations in advance, students who have studied a certain part of the course will be entitled to register for that module at the appropriate exam.  

Students log into ExamReg software, which has student personal information (admin put into the database based on the list of classes submitted by the training units) and CHOOSE the exam schedule of the module Students need to register for the exam. It contains information about the exam location, the exams, exam rooms, the number of test locations, and the function for students to select the exam they want to take. After the student has chosen, the registered student test schedule will be exported in the form of a report and students can download / print. Printouts and downloads are valuable proof that students register for the exam successfully. Students use this contest report card to take the exam.

## Features

The system has 2 user roles: administrator, student.

- Administrators manage exam / module lists.
- Administrator manages student list, grants accounts for students (from Excel).
- Administrators enter the list of students who have studied each exam subject (eligible to take the exam) (from Excel).
- Administrator enters the list of students who are not eligible to take the exam (from Excel).
- Administrators create semester, add exams for semester, add exam rooms (computer room) for the exam, schedule (exam date, start time, end time) for the exams, determine the exam subject for each exam.
- Students register for the exam (if eligible).
- Students download / print the exam report card after registering successfully.
- The administrator prints the list of contestants in each exam room for each exam.

## Technology

- Frontend: [Metronic theme](https://keenthemes.com/metronic/) for the dashboard and some jquery for ajax calls as well as some other effects.
- Backend: [Express.js framework](http://expressjs.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Demo

I have deployed the application on Heroku [here](https://glacial-ridge-02351.herokuapp.com/).  
For admin role, use username: admin@examreg.com, password: 123456.  
For student role, use username: 17021011@examreg.com, password: 123456.

** Note: Honestly, because of some issues, I built this application within 5 days to meet the deadline. So there are some incomplete features as well as a few bugs, please report any issues or feedback to [facebook](https://www.facebook.com/quangthai206) or email me at laiquangthai206@gmail.com. 
