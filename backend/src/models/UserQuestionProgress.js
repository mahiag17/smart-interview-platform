const mongoose = require("mongoose");

const userQuestionProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Solved",
        "RevisionNeeded",
        "NotAttempted",
      ],
      default: "NotAttempted",
    },

    personalNote: {
      type: String,
      default: "",
    },

    solvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UserQuestionProgress",
  userQuestionProgressSchema
);
