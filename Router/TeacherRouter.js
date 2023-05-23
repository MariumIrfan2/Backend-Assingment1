const express = require('express')
const instituteModel = require('../Models/instituteModel')
const { sendResponse } = require('../Helper/Helper');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await instituteModel.find();
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
    res.send("get Single institute Data")
});

route.post('/', async (req, res) => {
    let { name, course, contact } = req.body;
    try {
        let errArr = [];

        if (!name) {
            errArr.push("Required: First Name");
        }
        if (!course) {
            errArr.push("Required: last Name")
        }
        if (!contact) {
            errArr.push("Required: Email")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
            return;
        } else {
            let obj = { name, course, contact };
            let institute = new instituteModel(obj);
            await institute.save();
            if (!institute) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400)
            } else {
                res.send(sendResponse(true, institute, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error"));
    }
})

route.put("/:id", (req, res) => {
    res.send("Edit institute Data");
});
route.delete("/:id", (req, res) => {
    res.send("Delete institute");
});

module.exports = route; 