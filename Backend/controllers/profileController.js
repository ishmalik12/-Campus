import Profile from '../models/Profile.js';

export const createProfile = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      studentId,
      college,
      yearOfStudy,
      major,
      minor,
      graduationDate,
      gpa,
      technicalSkills,
      softSkills,
      certifications,
      languages,
      linkedIn,
      portfolio
    } = req.body;

    const resume = req.file ? req.file.filename : null;

    const profile = new Profile({
      userId,
      fullName,
      studentId,
      college,
      yearOfStudy,
      major,
      minor,
      graduationDate,
      gpa,
      technicalSkills,
      softSkills,
      certifications,
      languages,
      linkedIn,
      portfolio,
      resume
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating profile' });
  }
};
