const axios = require("axios");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/geminiService");

const uploadResume = async (req, res) => {
  

  try {
    const fileUrl = req.file.path;

    const pdfResponse = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdf(pdfResponse.data);

    const resumeText = pdfData.text;

    const analysis = await analyzeResume(
      resumeText,
      "Software Engineer"
    );

    const resume = await Resume.create({
      userId: req.user._id,
      fileUrl,
      atsScore: analysis.atsScore,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("UPLOAD ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  uploadResume,
};