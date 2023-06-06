const bcrypt = require('bcryptjs');
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../Helper/Helper')

const AuthController = {

    signup: async (req, res) => {
        const { userName, email, password } = req.body
        const obj = { userName, email, password };
        let requiredArr = ["userName", "email", "password"];
        let errArr = [];

        requiredArr.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x);
            }
        });

        if (errArr.length > 0) {
            res
                .send(sendResponse(false, null, "some feild are missing", errArr))
                .status(400);
            return;
        } else {
            let hashPassword = await bcrypt.hash(obj.password, 10);
            obj.password = hashPassword;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res
                    .send(sendResponse(false, null, "This email already exits")).status(403)

            } else {
                UserModel.create(obj)
                    .then((result) => {
                        res.send(sendResponse(true, result, "User Created Successfully"))

                    })
                    .catch((err) => {
                        res.send(sendResponse(false, null, "Internal Server Error", err))
                            .status(400)
                    })
            }
        }

    },
    login: async (req, res) => {
        let { email, password } = req.body;
        let obj = { email, password };
        console.log(obj)
        let result = await UserModel.findOne({ email })
        if (result) {
            let isConfirm = await bcrypt.compare(obj.password, result.password);
            if (isConfirm) {
                let token = jwt.sign({ ...result }, process.env.SECURE_KEY, {
                    expiresIn: "24h",
                })
                res.send(sendResponse(true, { user: result, token }, "loggedIn Successfully"))
            } else {
                res.send(sendResponse(false, null, "User doesn't exist"))
            }
        }
    },
    protected: async (req, res) => {
        let token = req.headers.authorization
        if (token) {
            token = token.split("")[1];
            jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
                if (err) {
                    res.send(sendResponse(false, null, "Unathorizedbb")).status(403);

                } else {
                    console.log(decoded)
                    next();
                }
            })
        } else {
            res.send(sendResponse(false, null, "Unathorized")).status(403)
        }
    },
    adminProtected: async (req, res, next) => {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
            if (err) {
                res.send(sendResponse(false, null, "Unauthorized")).status(403);
            } else {
                if (decoded._doc.isAdmin) {
                    next();
                } else {
                    res
                        .send(sendResponse(false, null, "You Have Rights for this Action"))
                        .status(403);
                }
            }
        });
    },
}

module.exports = AuthController