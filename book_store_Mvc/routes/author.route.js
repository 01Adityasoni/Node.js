const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');



router.get('/', authorController.getAllAuthors);
router.post('/', authorController.createAuthor);

module.exports = router;
