const db = require('../config/db');

exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId;

  try {
    const studentRes = await db.query('SELECT st_studentId FROM Students WHERE st_userId = $1', [userId]);
    if (studentRes.rows.length === 0) {
      return res.status(400).json({ message: 'Student profile not found' });
    }
    const studentId = studentRes.rows[0].st_studentid;

    const result = await db.query(
      'INSERT INTO Enrollments (en_studentId, en_courseId, en_status) VALUES ($1, $2, $3) RETURNING *',
      [studentId, courseId, 'Active']
    );

    res.status(201).json({ message: 'Enrolled successfully', enrollment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};