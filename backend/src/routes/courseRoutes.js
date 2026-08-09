const express = require('express');
const router = express.Router();
const { 
  getRunningCourses, 
  getOfferedCourses, 
  getCourseDetails 
} = require('../controllers/courseController');

router.get('/running', getRunningCourses);
router.get('/offers', getOfferedCourses);
router.get('/:id', getCourseDetails);

module.exports = router;