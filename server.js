require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;

// Connect to DB
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB!");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

const Student = require("./schemas/Student");

// Middleware
app.use(express.json());

// Get all students
app.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one student
app.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    // Or the following:
    // const student = await Student.findOne({_id: req.params.id});

    if (student) {
      res.json({ student });
    } else {
      res.status(404).json({ error: "student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create one student
app.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    school: req.body.school,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json({ newStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete one student
app.delete("/:id", async (req, res) => {
  try {
    const student = await Student.deleteOne({ _id: req.params.id });

    if (student) {
      res.json('Student deleted');
    } else {
      res.status(404).json({ error: "Student not found"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

// Update one student
app.patch("/:id", async (req, res) => {
  try {
    const student = await Student.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (student) {
      res.json("Student updated.");
    } else {
      res.status(404).json({ message: "Student not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/////////////////// TEST ///////////////////////
const axios = require("axios");

// Function to test the Get all students API
async function testGetAllStudents() {
  try {
    const response = await axios.get("http://localhost:3000");
    console.log("Get all students response:", response.data);
  } catch (error) {
    console.error("Error testing Get all students:", error.message);
  }
}

// Function to test the Get one student API
async function testGetOneStudent(studentId) {
  try {
    const response = await axios.get(`http://localhost:3000/${studentId}`);
    console.log("Get one student response:", response.data);
  } catch (error) {
    console.error("Error testing Get one student:", error.message);
  }
}

// Function to test the Create one student API
async function testCreateStudent(studentData) {
  try {
    const response = await axios.post("http://localhost:3000", studentData);
    console.log("Create student response:", response.data);
  } catch (error) {
    console.error("Error testing Create student:", error.message);
  }
}

// Function to test the Delete one student API
async function testDeleteStudent(studentId) {
  try {
    const response = await axios.delete(`http://localhost:3000/${studentId}`);
    console.log('Delete student response:', response.data);
  } catch (error) {
    console.error('Error testing Delete student:', error.message);
  }
}

// Function to test the Update one student API
async function testUpdateStudent(studentId, updateData) {
  try {
    const response = await axios.patch(`http://localhost:3000/${studentId}`, updateData);
    console.log('Update student response:', response.data);
  } catch (error) {
    console.error('Error testing Update student:', error.message);
  }
}


// testCreateStudent({ name: "Alice", age: 25, school: "COE" });
// testCreateStudent({ name: "Bob", age: 24, school: "Khoury" });
// testCreateStudent({ name: "Cathy", age: 25, school: "COE" });

// testGetAllStudents();
// const studentId = "6631c2f7a2a7652f711fd2fe";
// testGetOneStudent(studentId)

// const studentId = "6631c24c97ae4419ee8d663f";
// testDeleteStudent(studentId);

const studentId = "6631c2f7a2a7652f711fd2fe";
const updatedData = {
  age: 27,
  school: "COE"
}
testUpdateStudent(studentId, updatedData)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
