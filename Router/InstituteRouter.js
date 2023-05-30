// const express = require('express');
// const route = express.Router();

// const a = [
//     {
//         institutes: "ADB",
//         id: 1,
//     },
//     {
//         institutes: "ADB",
//         id: 2,
//     },
//     {
//         institutes: "xyz",
//         id: 3,
//     },
//     {
//         institutes: "ADB",
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
//     let { institutes } = req.body;
//     let errArr = [];

//     if (!institutes || institutes == '') {
//         errArr.push('institute name is required')
//     }

//     if (errArr.length > 0) {
//         res.send(errArr).status(400)
//         return;
//     } else {
//         let obj = {
//             institutes: institutes,
//             id: a.length + 1,
//         }
//         a.push(obj)
//         res.send(obj).status(200)
//     }
// })

// route.put('/:id', (req, res) => {
//     let id = req.params.id
//     let { institutes } = req.body;
//     if (i > -1) {
//         a[i].institutes = institutes;
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


route.post('/', async (req, res) => {
    let { name, shortName, address, tel } = req.body;
    try {
        let errArr = [];

        if (!name) {
            errArr.push("Required: First Name");
        }
        if (!shortName) {
            errArr.push("Required: last Name")
        }
        if (!address) {
            errArr.push("Required: Email")
        }
        if (!tel) {
            errArr.push("Required: tel")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
            return;
        } else {
            let obj = { name, shortName, address, tel };
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

route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await instituteModel.findById(id);
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

route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await instituteModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await instituteModel.findByIdAndUpdate(id, req.body, {
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
        let result = await instituteModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        } else {
            let delResult = await instituteModel.findByIdAndDelete(id);
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