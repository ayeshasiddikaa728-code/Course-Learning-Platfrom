const db = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Courses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCourseDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await db.query('SELECT * FROM Courses WHERE co_courseId = $1', [id]);
    if (course.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Courses (co_title, co_description, co_price) VALUES ($1, $2, $3) RETURNING *',
      [title, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};