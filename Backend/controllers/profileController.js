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
      bio,
      portfolio,
      works,
      badges
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
      bio,
      resume,
      works,
      badges
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating profile' });
  }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};