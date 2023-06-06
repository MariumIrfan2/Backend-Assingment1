const express = require('express')
const StudentController = require('../Controllers/StudentController')

const route = express.Router();

route.get('/', StudentController.getStudents);

route.get("/search", StudentController.searchStudent);

route.post("/searchStd", StudentController.searchWithPagination);

route.get("/:id", StudentController.getStudentById);

route.post('/', StudentController.createStudent)

route.put("/:id", StudentController.editStudent);

route.delete("/:id", StudentController.deleteStudent);


module.exports = route; 