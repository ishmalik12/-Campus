const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  college: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  major: { type: String, required: true },
  minor: { type: String, required: true },
  graduationDate: { type: Date, required: true },
  gpa: { type: String, required: true },
  technicalSkills: { type: [String], required: true },  // updated to an array of strings
  softSkills: { type: [String], required: true },  // updated to an array of strings
  certifications: { type: [String], required: true },  // updated to an array of strings
  languages: { type: [String], required: true },  // updated to an array of strings
  linkedIn: { type: String, required: false },
  portfolio: { type: String, required: false },
  resume: { type: String, required: false }  // ensure this field is correctly handled
});

const JobSeeker = mongoose.model('JobSeeker',profileSchema);

module.exports = JobSeeker;
