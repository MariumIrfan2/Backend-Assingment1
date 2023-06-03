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

route.get("/search", async (req, res) => {
    
    let { firstName, lastName } = req.body;
    if (firstName) {
        let result = await studentModel.find({
            firstName: firstName,
            lastName: lastName,
        });
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    }
});

route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (e) {
        console.log(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
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

route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await studentModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res
                    .send(sendResponse(true, updateResult, "Updated Successfully"))
                    .status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Error")).status(400);
    }
});

route.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        } else {
            let delResult = await studentModel.findByIdAndDelete(id);
            if (!delResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res.send(sendResponse(true, null, "Deleted Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "No Data on this ID")).status(404);
    }
});


module.exports = route; 