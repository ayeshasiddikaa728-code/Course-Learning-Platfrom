const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseDetails);
router.post('/', verifyToken, authorizeRoles('Instructor', 'Admin'), courseController.createCourse);

module.exports = router;