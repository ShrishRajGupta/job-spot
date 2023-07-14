const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/validateJWT');
const { postComment, likePost } = require("../controllers/accessoriesController");
// *********************Route begins with /job-post*********************

// Comment on post feature
// id = job id in POST Model
router.post('/:id', authenticateToken, postComment);

// like a post feature
// id = job id in POST Model
router.get('/like/:id', authenticateToken,likePost);

module.exports = router;