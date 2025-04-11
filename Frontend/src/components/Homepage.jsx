import React, { useEffect, useState, useRef } from 'react';
import background from './photos/weskillbg.jpg';
import image1 from './photos/image1.jpg';
import image2 from './photos/FeatureNetworking.jpg';
import image3 from './photos/FeatureNotify.jpg';
import image4 from './photos/FeatureLeaderboard.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import weskill from './photos/weskillremovedbg.png';
import img from './photos/img.jpg';

export default function Homepage() {
  const [activeSection, setActiveSection] = useState('#home');
  const sections = useRef({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionKeys = Object.keys(sections.current);
      const currentSection = sectionKeys.find((key) => {
        const section = sections.current[key];
        const { top, bottom } = section.getBoundingClientRect();
        return top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2;
      });
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        window.history.replaceState(null, '', currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const features = [
    {
      img: image1,
      title: 'Campus Projects',
      desc: 'Explore real-world and college-led projects. Collaborate and build experience beyond the classroom.',
    },
    {
      img: image2,
      title: 'Student Network',
      desc: 'Connect with like-minded peers, form teams, and learn from one another in a collaborative environment.',
    },
    {
      img: image3,
      title: 'Instant Notifications',
      desc: 'Stay updated with project deadlines, college events, and group activity using real-time notifications.',
    },
    {
      img: image4,
      title: 'Leaderboard & Rewards',
      desc: 'Compete, contribute, and get recognized on campus leaderboards. Earn badges and rewards for your efforts!',
    },
    {
      img: image2,
      title: 'Skill Sharing',
      desc: 'Post your skills, organize workshops, or help juniors. Share knowledge, earn reputation.',
    },
    {
      img: image3,
      title: 'AI-Based Opportunities',
      desc: 'Let our AI recommend college clubs, hackathons, and internships that match your interests.',
    }
  ];

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg  bg-dark sticky-top" style={{backgroundColor:"#1e1e1e", color:"white"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={weskill} style={{ maxHeight: '3rem' }} alt="@Campus Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={`nav-link ${activeSection === '#home' ? 'active' : ''}`} href="#home" style={{color:"white"}}>Home</a>
              <a  style={{color:"white"}} className={`nav-link ${activeSection === '#features' ? 'active' : ''}`} href="#features">Features</a>
              <a  style={{color:"white"}} className={`nav-link ${activeSection === '#about-us' ? 'active' : ''}`} href="#about-us">About Us</a>
            </div>
            <div className="ms-auto d-flex">
              <Link to="/registerpage" className="btn btn-light mx-2">Join Now</Link>
              <Link to="/loginpage" className="btn btn-success text-white">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <section
        ref={(el) => (sections.current['#home'] = el)}
        id="home"
        className="d-flex align-items-center min-vh-100 text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '2rem',
        }}
      >
        <div className="container">
          <h1 style={{ fontFamily: 'Peralta', fontSize: '3rem' }}>Welcome to</h1>
          <h1 style={{ fontFamily: 'Peralta', fontSize: '4rem', color: '#03C03C' }}>@Campus</h1>
          <h3 className="my-3" style={{ fontFamily: 'BankGothic Lt BT', color: 'whitesmoke' }}>
            Your Campus. Your Network. Your Growth.
          </h3>
          <p style={{ fontFamily: 'Swis721 Ex BT', color: 'whitesmoke', fontSize: '1.1rem' }}>
            A platform crafted for college students to collaborate, innovate, and grow. Find projects, meet peers,
            join clubs, and unlock campus opportunities – all in one place.
          </p>
        </div>
      </section>

      <section
        ref={(el) => (sections.current['#features'] = el)}
        id="features"
        className="container py-5"
      >
        <h2 className="text-center mb-5">Campus Features</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {features.map((feature, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img src={feature.img} className="card-img-top" alt={feature.title} />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={(el) => (sections.current['#about-us'] = el)}
        id="about-us"
        className="min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h2 className="display-4">About @Campus</h2>
        <p className="lead">Empowering students to create, connect, and conquer their campus journey.</p>
      </section>

      <footer className="bg-dark text-white py-4 text-center">
        <p>&copy; 2025 @Campus. Built for students, by students.</p>
      </footer>
    </div>
  );
}