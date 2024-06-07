const express = require('express');
const router = express.Router();
const testUserMiddleware = require('../middleware/testUser');
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController');

router.route('/').post(testUserMiddleware, createJob).get(getAllJobs);
router
  .route('/:id')
  .get(getJob)
  .delete(testUserMiddleware, deleteJob)
  .patch(testUserMiddleware, updateJob);

module.exports = router;
