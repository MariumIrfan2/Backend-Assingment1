// const express = require('express');
// const route = express.Router();

// const a = [
//     {
//         courses: "ADB",
//         id: 1,
//     },
//     {
//         courses: "ADB",
//         id: 2,
//     },
//     {
//         courses: "xyz",
//         id: 3,
//     },
//     {
//         courses: "ADB",
//         id: 4,
//     },
// ];

// route.get('/', (req, res) => {
//     res.send(JSON.stringify(a))
// })
// route.get('/:id', (req, res) => {
//     let id = req.params.id
//     let i = a.findIndex(x => x.id == id)

//     if (i > -1) {
//         res.send(a[i]).status(200)
//     } else {
//         res.send('data not found').status(404)
//     }
// })

// route.post('/', (req, res) => {
//     let { courses } = req.body;
//     let errArr = [];

//     if (!courses || courses == '') {
//         errArr.push('course name is required')
//     }

//     if (errArr.length > 0) {
//         res.send(errArr).status(400)
//         return;
//     } else {
//         let obj = {
//             courses: courses,
//             id: a.length + 1,
//         }
//         a.push(obj)
//         res.send(obj).status(200)
//     }
// })

// route.put('/:id', (req, res) => {
//     let id = req.params.id
//     let { courses } = req.body;
//     if (i > -1) {
//         a[i].courses = courses;
//         res.send(a[i]).status(200)
//     } else {
//         res.send('data not found').status(404)
//     }

// })

// route.delete('/:id', (req, res) => {
//     let id = req.params.id
//     let i = a.findIndex(x => x.id == id)

//     if (i > -1) {
//         a.splice(i, 1);
//         res.send({ msg: 'deleted', data: a }).status(200)
//     } else {
//         res.send('data not found').status(404)
//     }
// })

// module.exports = route;        


const express = require('express')
const courseModel = require('../Models/courseModel')
const { sendResponse } = require('../Helper/Helper');


const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await courseModel.find();
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
    res.send("get Single course Data")
});

route.post('/', async (req, res) => {
    let { name, shortName, duration, fee } = req.body;
    try {
        let errArr = [];

        if (!name) {
            errArr.push("Required: Name");
        }
        if (!shortName) {
            errArr.push("Required: shortName")
        }
        if (!duration) {
            errArr.push("Required: duration")
        }
        if (!fee) {
            errArr.push("Required: fee")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
            return;
        } else {
            let obj = { name, shortName, duration, fee };
            let course = new courseModel(obj);
            await course.save();
            if (!course) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400)
            } else {
                res.send(sendResponse(true, course, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error"));
    }
})

route.put("/:id", (req, res) => {
    res.send("Edit course Data");
});
route.delete("/:id", (req, res) => {
    res.send("Delete course");
});

module.exports = route; 