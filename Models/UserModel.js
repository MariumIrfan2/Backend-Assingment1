const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);


// const mongoose = require("mongoose");

// const qualificationSchema = new mongoose.Schema({
//   degree: {
//     type: String,
//     required: true,
//   },
//   year: {
//     type: Number,
//   },
//   inst: {
//     type: String,
//     required: true,
//   },
// });

// const userSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   dataOfBirth: {
//     type: Date,
//   },
//   registrationDate: {
//     type: Date,
//     default: Date.now(),
//   },
//   hobbies: {
//     type: [String],
//   },
//   lastQualification: {
//     type: [qualificationSchema],
//   },
//   address: {
//     type: {
//       street: String,
//       houseNo: String,
//     },
//   },
// });

// module.exports = mongoose.model("users", userSchema);
