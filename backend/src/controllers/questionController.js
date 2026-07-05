const asyncHandler = require("express-async-handler");
const Question = require("../models/Question");

const getQuestions = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.topic) {
    filter.topic = req.query.topic;
  }

  if (req.query.company) {
    filter.companies = req.query.company;
  }

  if (req.query.type) {
    filter.type = req.query.type;
  }

  if (req.query.difficulty) {
    filter.difficulty = req.query.difficulty;
  }

  const questions = await Question.find(filter);

  res.json(questions);
});

module.exports = {
  getQuestions,
};