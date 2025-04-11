import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeSkillNavbar from './MainNavbar';

export default function ProfileDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5001/api/profiles/getProfile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <>
      <WeSkillNavbar />
      <div className="container mt-5">
        <div className="card shadow-lg border-0 p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Your Profile</h2>
          <div className="row">
            <div className="col-md-6 border-end">
              <div className="mb-3">
                <strong>Full Name:</strong>
                <div className="text-muted">{profile.fullName}</div>
              </div>
              <div className="mb-3">
                <strong>Student ID:</strong>
                <div className="text-muted">{profile.studentId}</div>
              </div>
              <div className="mb-3">
                <strong>College:</strong>
                <div className="text-muted">{profile.college}</div>
              </div>
              <div className="mb-3">
                <strong>Year of Study:</strong>
                <div className="badge bg-secondary">{profile.yearOfStudy}</div>
              </div>
              <div className="mb-3">
                <strong>Major:</strong>
                <div className="text-muted">{profile.major}</div>
              </div>
              <div className="mb-3">
                <strong>Minor:</strong>
                <div className="text-muted">{profile.minor || '-'}</div>
              </div>
              <div className="mb-3">
                <strong>Graduation Date:</strong>
                <div className="text-muted">{new Date(profile.graduationDate).toLocaleDateString()}</div>
              </div>
              <div className="mb-3">
                <strong>GPA:</strong>
                <div className="text-muted">{profile.gpa}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <strong>Technical Skills:</strong>
                <div className="text-muted">{profile.technicalSkills}</div>
              </div>
              <div className="mb-3">
                <strong>Soft Skills:</strong>
                <div className="text-muted">{profile.softSkills}</div>
              </div>
              <div className="mb-3">
                <strong>Certifications:</strong>
                <div className="text-muted">{profile.certifications}</div>
              </div>
              <div className="mb-3">
                <strong>Languages:</strong>
                <div className="text-muted">{profile.languages}</div>
              </div>
              <div className="mb-3">
                <strong>LinkedIn:</strong>
                <div><a className="btn btn-outline-primary btn-sm" href={profile.linkedIn} target="_blank" rel="noreferrer">Visit Profile</a></div>
              </div>
              <div className="mb-3">
                <strong>Portfolio:</strong>
                <div><a className="btn btn-outline-success btn-sm" href={profile.portfolio} target="_blank" rel="noreferrer">View Portfolio</a></div>
              </div>
              <div className="mb-3">
                <strong>Bio:</strong>
                <div className="text-muted">{profile.bio}</div>
              </div>
              <div className="mb-3">
                <strong>Resume:</strong>
                <div><a className="btn btn-outline-dark btn-sm" href={`https://localhost:5001/uploads/${profile.resume}`} target="_blank" rel="noreferrer">Download Resume</a></div>
              </div>
              <div className="mb-3">
  <h5>Open to Work</h5>
  <ul>
    {profile.works?.map((work, index) => (
      <li key={index}>{work}</li>
    ))}
  </ul>
</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
