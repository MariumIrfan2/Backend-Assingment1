const express = require('express');
const TodoModel = require('../Models/TodoModel')
const { sendResponse } = require('../Helper/Helper');

const route = express.Router();

route.get('/', async (req, res) => {
    const pageNo = req.query.p || 1;
    const itemsPerPage = 2;

    try {
        const result = await TodoModel.find()
            .skip((pageNo - 1) * itemsPerPage)
            .limit(itemsPerPage);

        const totalCount = await TodoModel.countDocuments();
        // req.headers.recordCount = totalCount 
        if (!result) {
            res.send(sendResponse(false, null, "no data found"))
        } else {
            res.send(sendResponse(true, result)).status(200)
        }

    } catch (e) {
        console.error(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
});

route.post('/', async (req, res) => {
    let { text } = req.body;
    try {
        let errArr = [];

        if (!text) {
            errArr.push("Required: Todo");
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
            return;
        } else {
            let obj = { text };
            let todo = new TodoModel(obj);
            await todo.save();
            if (!todo) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400)
            } else {
                res.send(sendResponse(true, todo, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error"));
    }
})

module.exports = route