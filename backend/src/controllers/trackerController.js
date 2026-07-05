const asyncHandler = require("express-async-handler");

const UserQuestionProgress = require(
  "../models/UserQuestionProgress"
);

const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await UserQuestionProgress.find({
    userId: req.user._id,
  }).populate("questionId");

  res.json(progress);
});

const updateProgress = asyncHandler(async (req, res) => {
  const { status, personalNote } = req.body;

  let progress =
    await UserQuestionProgress.findOne({
      userId: req.user._id,
      questionId: req.params.questionId,
    });

  if (!progress) {
    progress = new UserQuestionProgress({
      userId: req.user._id,
      questionId: req.params.questionId,
    });
  }

  if (status) {
    progress.status = status;
  }

  if (personalNote) {
    progress.personalNote = personalNote;
  }

  if (status === "Solved") {
    progress.solvedAt = new Date();
  }

  await progress.save();

  res.json(progress);
});

module.exports = {
  getMyProgress,
  updateProgress,
};