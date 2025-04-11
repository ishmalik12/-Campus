import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  studentId: String,
  college: String,
  yearOfStudy: String,
  major: String,
  minor: String,
  graduationDate: Date,
  gpa: String,
  technicalSkills: String,
  softSkills: String,
  certifications: String,
  languages: String,
  linkedIn: String,
  portfolio: String,
  resume: String, // File path
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      },
      status: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
