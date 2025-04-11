const Profile = require('../models/Profile');
const path = require('path');

exports.createProfile = async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    console.log('Files:', req.files);

    // Handle array fields properly
    const getArrayField = (fieldName) => {
      if (Array.isArray(req.body[fieldName])) {
        return req.body[fieldName];
      }
      if (req.body[fieldName]) {
        return [req.body[fieldName]];
      }
      return [];
    };

    // Prepare profile data
    const profileData = {
      userId: req.body.userId,
      fullName: req.body.fullName,
      studentId: req.body.studentId,
      college: req.body.college,
      yearOfStudy: req.body.yearOfStudy,
      major: req.body.major,
      minor: req.body.minor,
      graduationDate: req.body.graduationDate,
      gpa: req.body.gpa,
      technicalSkills: getArrayField('technicalSkills'),
      softSkills: getArrayField('softSkills'),
      certifications: req.body.certifications,
      languages: req.body.languages,
      linkedIn: req.body.linkedIn,
      portfolio: req.body.portfolio,
      resume: req.files && req.files.resume ? req.files.resume[0].path : null, // Handle resume upload
    };

    // Validate required fields
    const requiredFields = ['userId', 'fullName', 'studentId', 'college', 'yearOfStudy', 'major', 'graduationDate', 'technicalSkills'];
    const missingFields = requiredFields.filter(field => !profileData[field] || (Array.isArray(profileData[field]) && profileData[field].length === 0));

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields,
        receivedData: profileData
      });
    }

    // Create and save profile
    const profile = await Profile.create(profileData);
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      profile
    });

  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update an existing profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Handle resume file upload if provided
    if (req.files && req.files.resume) {
      updates.resume = req.files.resume[0].path;
    }

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile.', error });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json({ message: 'Profile deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete profile.', error });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
      .select('fullName studentId college yearOfStudy major minor graduationDate gpa technicalSkills softSkills certifications languages linkedIn portfolio resume')
      .lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.checkProfile = async (req, res) => {
  try {
    const { profileId } = req.query;
    if (!profileId) {
      return res.status(400).json({ error: 'Profile ID is required' });
    }

    const profile = await Profile.findOne({ profileId });
    if (profile) {
      return res.status(200).json({ exists: true, profile });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking profile:', error.message);
    res.status(500).json({ error: 'Failed to check profile.' });
  }
};

exports.filterProfiles = async (req, res) => {
  try {
    const { category, filters } = req.body;
    console.log("Received Category:", category);
    console.log("Received Filters:", filters);

    const categoryName = typeof category === "string" ? category : "Web Development";

    const query = { technicalSkills: { $in: [categoryName] } };

    if (filters && Object.keys(filters).length > 0) {
      query.$and = [];

      if (filters.gpa) {
        query.$and.push({ gpa: { $gte: filters.gpa } });
      }
      if (filters.certifications) {
        query.$and.push({ certifications: { $in: filters.certifications } });
      }
      if (filters.languages) {
        query.$and.push({ languages: { $in: filters.languages } });
      }

      if (query.$and.length === 0) {
        delete query.$and;
      }
    }

    console.log("MongoDB Query:", JSON.stringify(query, null, 2));

    const profiles = await Profile.find(query);
    if (!profiles.length) {
      return res.status(200).json([]); // Instead of 404, return empty array
    }

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error in filterProfiles Controller:", error.message);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
