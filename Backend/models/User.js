const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Matches a 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Matches a valid email address
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      enum: ['B.Tech', 'BBA', 'LLB', 'BCA', 'B.Com', 'BA', 'MBA', 'M.Tech'], // Add/edit as per your supported list
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    ordersPlaced: [
      {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, default: "In Progress" },
        profileHandler: { type: String },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
