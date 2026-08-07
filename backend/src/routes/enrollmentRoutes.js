const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.post('/', verifyToken, authorizeRoles('Student'), enrollmentController.enrollCourse);

module.exports = router;