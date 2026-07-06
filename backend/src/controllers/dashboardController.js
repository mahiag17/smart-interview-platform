const UserQuestionProgress = require("../models/UserQuestionProgress");
const Question = require("../models/Question");
const Resume = require("../models/Resume");

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      solvedCount,
      progressData,
      latestResume,
    ] = await Promise.all([
      UserQuestionProgress.countDocuments({
        userId,
        status: "Solved",
      }),

      UserQuestionProgress.find({
        userId,
        status: "Solved",
      }).populate("questionId"),

      Resume.findOne({
        userId,
      }).sort({
        analyzedAt: -1,
      }),
    ]);

    const topicProgress = {};

    progressData.forEach((item) => {
      const topic = item.questionId?.topic;

      if (!topic) return;

      topicProgress[topic] =
        (topicProgress[topic] || 0) + 1;
    });

    res.json({
      solvedQuestions: solvedCount,

      topicProgress,

      streak: req.user.streak,

      latestResumeScore:
        latestResume?.atsScore || null,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDashboardSummary,
};