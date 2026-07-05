require("dotenv").config();

const mongoose = require("mongoose");
const Question = require("./src/models/Question");

mongoose.connect(process.env.MONGO_URI);

const questions = [
  {
    title: "Two Sum",
    description: "Find two numbers whose sum equals target.",
    type: "DSA",
    topic: "Arrays",
    companies: ["Google", "Amazon"],
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum",
  },

  {
    title: "Merge Intervals",
    description: "Merge overlapping intervals.",
    type: "DSA",
    topic: "Arrays",
    companies: ["Google"],
    difficulty: "Medium",
    link: "",
  },

  {
    title: "Binary Tree Traversal",
    description: "Perform inorder traversal.",
    type: "DSA",
    topic: "Trees",
    companies: ["Microsoft"],
    difficulty: "Medium",
    link: "",
  },

  {
    title: "Tell Me About Yourself",
    description: "Introduce yourself professionally.",
    type: "HR",
    topic: "Introduction",
    companies: ["Amazon"],
    difficulty: "Easy",
    link: "",
  },

  {
    title: "Design URL Shortener",
    description: "Design a system like Bitly.",
    type: "SystemDesign",
    topic: "Scalability",
    companies: ["Google"],
    difficulty: "Hard",
    link: "",
  }
];


const seedQuestions = async () => {
  try {
    await Question.deleteMany();

    await Question.insertMany(questions);

    console.log("✅ Questions Seeded");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedQuestions();