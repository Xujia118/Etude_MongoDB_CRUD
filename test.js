const axios = require("axios");


// Function to test the Get all students API
async function testGetAllStudents() {
  try {
    const response = await axios.get('http://localhost:3000');
    console.log('Get all students response:', response.data);
  } catch (error) {
    console.error('Error testing Get all students:', error.message);
  }
}

// Function to test the Create one student API
async function testCreateStudent(studentData) {
  try {
    const response = await axios.post('http://localhost:3000', studentData);
    console.log('Create student response:', response.data);
  } catch (error) {
    console.error('Error testing Create student:', error.message);
  }
}

testGetAllStudents()
testCreateStudent({name: 'Alice', age: 25, school: 'COE'})