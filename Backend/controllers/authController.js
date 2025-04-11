const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    User Signup
// @route   POST /api/users/signup
// @access  Public
exports.signupUser = async (req, res) => {
  try {
    const {
      name,
      age,
      phone,
      gender,
      email,
      password,
      city,
      collegeName,
      course,
      section,
      role,
    } = req.body;

    // Validate required fields
    if (!name || !age || !phone || !gender || !email || !password || !city || !collegeName || !course || !section) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.trim().toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all the necessary fields
    const newUser = new User({
      name: name.trim(),
      age,
      phone: phone.trim(),
      gender: gender.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      city: city.trim(),
      collegeName: collegeName.trim(),
      course: course.trim(),
      section: section.trim(),
      role: role?.trim() || 'provider', // Default to 'provider' if no role is specified
      ordersPlaced: [], // Initial empty array for orders placed
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Send response with user details and JWT token
    res.status(201).json({
      message: 'User created successfully!',
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
    }

    const token = generateToken(user._id);

    // Respond with token and user details
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        collegeName: user.collegeName,
        course: user.course,
        section: user.section,
        profileId:user.profileId
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};
