const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userRole = role || 'Student';

  try {
    const existing = await db.query('SELECT * FROM Users WHERE us_email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const userRes = await client.query(
        'INSERT INTO Users (us_name, us_email, us_passwordHash, us_role) VALUES ($1, $2, $3, $4) RETURNING us_userId, us_name, us_email, us_role',
        [name, email, hash, userRole]
      );
      const userId = userRes.rows[0].us_userid;

      if (userRole === 'Student') {
        await client.query('INSERT INTO Students (st_userId) VALUES ($1)', [userId]);
      } else if (userRole === 'Instructor') {
        await client.query('INSERT INTO Instructors (in_userId) VALUES ($1)', [userId]);
      }

      await client.query('COMMIT');
      res.status(201).json({ message: 'Registered successfully', user: userRes.rows[0] });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRes = await db.query('SELECT * FROM Users WHERE us_email = $1', [email]);
    if (userRes.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.us_passwordhash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.us_userid, role: user.us_role, name: user.us_name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.us_userid, name: user.us_name, email: user.us_email, role: user.us_role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};