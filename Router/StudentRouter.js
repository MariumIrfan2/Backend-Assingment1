const express = require('express')
const studentModel = require('../Models/StudentModel')
const { sendResponse } = require('../Helper/Helper');


const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await studentModel.find();
        if (!result) {
            res.send(sendResponse(false, null, "no data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200)
        }


    } catch (e) {
        console.log(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
});

route.get('/:id', (req, res) => {
    res.send("get Single Student Data")
});

route.post('/', async (req, res) => {
    let { firstName, lastName, email, password, contact } = req.body;
    try {
        let errArr = [];

        if (!firstName) {
            errArr.push("Required: First Name");
        }
        if (!lastName) {
            errArr.push("Required: last Name")
        }
        if (!email) {
            errArr.push("Required: Email")
        }
        if (!password) {
            errArr.push("Required: Password")
        }
        if (!contact) {
            errArr.push("Required: Contact");
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
            return;
        } else {
            let obj = { firstName, lastName, email, password, contact };
            let student = new studentModel(obj);
            await student.save();
            if (!student) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400)
            } else {
                res.send(sendResponse(true, student, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error"));
    }
})

route.put("/:id", (req, res) => {
    res.send("Edit Student Data");
});
route.delete("/:id", (req, res) => {
    res.send("Delete Student");
});

module.exports = route; 