const express = require('express');
const router = express.Router();
const { getTopics, getTopicById, getLanguages } = require('../controller');

router.get('/topics', (req, res, next) => {
  getTopics(req, res).catch(next);
});

router.get("/languages", (req, res, next) => {
  getLanguages(req, res).catch(next);
});

router.get("/topics/:id", (req, res, next) => {
  getTopicById(req, res).catch(next);
});

module.exports = router;