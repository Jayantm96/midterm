const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/student.model");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://Shivani:data1234@cluster0.jpwml4z.mongodb.net/")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(() => {
    console.log("error");
  });

//routes
app.get("/", (req, res) => {
  res.send("MidTerm Test");
});
app.listen(2000, () => {
  console.log("Node API is running on port 2000");
});
//Fetch all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add new student
app.post("/students", async (req, res) => {
  try {
    console.log(req.body);
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//Fetch a single student by id
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update a student by id
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let updated = await Student.updateOne({ _id: id }, req.body);
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//delete a student by id
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.messsge });
  }
});
