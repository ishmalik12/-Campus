
import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    college: '',
    yearOfStudy: '',
    major: '',
    minor: '',
    graduationDate: '',
    gpa: '',
    technicalSkills: '',
    softSkills: '',
    certifications: '',
    languages: '',
    linkedIn: '',
    portfolio: '',
    bio: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [works, setWorks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    const data = new FormData();
    data.append('works', JSON.stringify(works));
    data.append('userId', userId);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (resumeFile) {
      data.append('resume', resumeFile);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/profiles/create', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error creating profile');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Create Profile</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-6">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" placeholder="Full Name" required />
          </div>
          <div className="col-md-6">
            <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} className="form-control" placeholder="Student ID" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input type="text" name="college" value={formData.college} onChange={handleChange} className="form-control" placeholder="College" />
          </div>
          <div className="col-md-6">
            <input type="text" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="form-control" placeholder="Year of Study" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input type="text" name="major" value={formData.major} onChange={handleChange} className="form-control" placeholder="Major" />
          </div>
          <div className="col-md-6">
            <input type="text" name="minor" value={formData.minor} onChange={handleChange} className="form-control" placeholder="Minor" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input type="date" name="graduationDate" value={formData.graduationDate} onChange={handleChange} className="form-control" placeholder="Graduation Date" />
          </div>
          <div className="col-md-6">
            <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} className="form-control" placeholder="GPA" />
          </div>
        </div>

        <div className="mb-3">
          <input type="text" name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} className="form-control" placeholder="Technical Skills (comma separated)" />
        </div>

        <div className="mb-3">
          <input type="text" name="softSkills" value={formData.softSkills} onChange={handleChange} className="form-control" placeholder="Soft Skills (comma separated)" />
        </div>

        <div className="mb-3">
          <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} className="form-control" placeholder="Certifications (comma separated)" />
        </div>

        <div className="mb-3">
          <input type="text" name="languages" value={formData.languages} onChange={handleChange} className="form-control" placeholder="Languages (comma separated)" />
        </div>

        <div className="mb-3">
          <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="form-control" placeholder="LinkedIn URL" />
        </div>

        <div className="mb-3">
          <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="form-control" placeholder="Portfolio URL" />
        </div>

        <div className="mb-3">
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="form-control" placeholder="Write a short bio..." rows="4" />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Resume (PDF only)</label>
          <input type="file" name="resume" onChange={handleFileChange} className="form-control" accept=".pdf" />
        </div>
        <div className="mb-3">
  <label className="form-label">Open to Work</label>
  <div className="d-flex flex-wrap gap-3">
    {["tutoring", "hackathons", "assignments", "study groups", "cultural events", "business startup join"].map((option) => (
      <div key={option} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={option}
          value={option}
          checked={works.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              setWorks([...works, option]);
            } else {
              setWorks(works.filter(w => w !== option));
            }
          }}
        />
        <label className="form-check-label" htmlFor={option}>{option}</label>
      </div>
    ))}
  </div>
</div>

        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
