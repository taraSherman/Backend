const express = require('express');
const Students = require('./students-model.js');
const router = express.Router();


const studentInfo = {
  'id': 'id',
  'first_name': 'first_name',
  'last_name': 'last_name',
  'grade_id': 'grade_id',
  'background_story': 'background_story',
  'status': 'status',
  'age': 'age',
  'insurance_card': 'insurance_card',
  'insurance_expiration_date': 'insurance_expiration_date',
  'birth_certificate': 'birth_certificate',
  'special_needs': 'special_needs',
  'representative': 'representative',
  'contact_info': 'contact_info',
  'visit_id': 'visit_id'
}

router.get('/', (req, res) => {
  Students.findStudents()
  .then(students => {
    res.json(students);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to get students' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Students.findStudentById(id)
  .then(student => {
    if (student) {
      res.json(student);
    } else {
      console.log(err);
      res.status(404).json({ message: 'Could not find student with given id.' })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to get student' });
  });
});

router.post('/', (req, res) => {
  const studentData = req.body;

  Students.addStudent(studentData)
  .then(student => {
    res.status(201).json(student);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to add student' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Students.findStudentById(id)
  .then(student => {
    if (student) {
      Students.updateStudent(changes, id)
      .then(updatedStudent => {
        res.json(updatedStudent);
      });
    } else {
    console.log(err);
      res.status(404).json({ message: 'Could not find student with given id' });
    }
  })
  .catch (err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to update student' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Students.removeStudent(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find student with given id' });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete student' });
  });
});

module.exports = router;