const db = require('../config/db');

// ১. চলমান কোর্সসমূহ পাওয়ার ফাংশন (Running Courses)
const getRunningCourses = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses WHERE status = 'running' ORDER BY created_at DESC");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ২. অফার বা ডিসকাউন্টে থাকা কোর্সসমূহ (Offered Courses)
const getOfferedCourses = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses WHERE is_offer = true ORDER BY created_at DESC");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৩. নির্দিষ্ট কোর্সে ঢোকা বা ডিটেইলস দেখা (Single Course Details)
const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM courses WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getRunningCourses,
  getOfferedCourses,
  getCourseDetails
};