const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "DSA",
        "HR",
        "Technical",
        "Behavioral",
        "SystemDesign",
      ],
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    companies: [
      {
        type: String,
      },
    ],

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);