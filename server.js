// function node(name) {
//     console.log("hello " + name)
// }
// node('marium')


// const fs = require('fs');
// const http = require('http');

// const files = fs.readdir('./', (err, dir) => {

//     if (err) { console.log('error', err) }
//     else {
//         console.log('result', dir)
//     }
// }
// )

// fs.readFile("./ab.txt", "utf-8", (err, file) => {
//     console.log(file)
// })


// this will overwrite the text and if the file dosent exists it will create it.
// fs.writeFile("./ab.txt", "New texttttttt from Server.js file", (err)=>{
//     if(err){
//         console.log(err)
//     }else {
//         console.log("updated")
//     }
// })


// add new text after the old one appends it dosent overwrite and if file dosent 
// exist it will create one
// fs.appendFile("./ab.txt", " marium", (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("file appended done")
//     }
// })

// HTTP MODULE

// const Server = http.createServer((req, res) => {
//     console.log("Server is listening on the port 5000");
//     console.log("request URL", req.url);
//     if (req.url == "/courses") {
//         res.write(JSON.stringify(a));
//         res.end()
//     }
// });

// Server.listen(5000);

// EXPRESS JS
const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require("dotenv").config();

const StudentRouter = require("./Router/StudentRouter")
const CourseRouter = require("./Router/CourseRouter")
const InstituteRouter = require("./Router/InstituteRouter")
const TeacherRouter = require("./Router/TeacherRouter")
const TodoRouter = require("./Router/TodoRouter")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/students", StudentRouter)
app.use("/api/todos", TodoRouter)
app.use("/api/courses", CourseRouter)
app.use("/api/institutes", InstituteRouter)
app.use("/api/teachers", TeacherRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('database connected successfully and server is listening on port 5000')
        })
    })
    .catch((err) => {
        console.log(err)
    })



