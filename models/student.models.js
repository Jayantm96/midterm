const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a student name"],
  },
  age: {
    type: Number,
    required: [true, "Please Enter a student age"],
  },
  major: {
    type: String,
    required: [true, "Please Enter a student major"],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
