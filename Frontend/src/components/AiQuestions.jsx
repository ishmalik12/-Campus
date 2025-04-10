import React, { useState } from "react";
import { Button, Card, CardContent } from "./Card";
import WeSkillNavbar from "./MainNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const allQuestions = {
  "Web Development": [
    {
      question: "What type of website do you need?",
      options: [
        { label: "Portfolio Website", image: "" },
        { label: "E-commerce Store", image: "" },
        { label: "Business Website", image: "" },
        { label: "Blog", image: "" },
        { label: "Custom Web Application", image: "" },
        { label: "Other", image: "" },
      ],
    },
    {
      question: "Technology Preference",
      options: [
        { label: "HTML, CSS, JavaScript" },
        { label: "React, Vue.js, Angular" },
        { label: "WordPress, Shopify, Wix" },
        { label: "Full-stack (Node.js, Express, MongoDB, SQL)" },
        { label: "No preference, need expert recommendation" },
      ],
    },
    {
      question: "Job seeker traits",
      options: [
        { label: "dedicated" },
        { label: "punctual" },
        { label: "Best work" },
        { label: "budget friendly" },
      ],
    },
  ],
  "Graphic Design": [
  {
    "question": "What type of design do you need?",
    "options": [
      { "label": "Logo Design", "image": "" },
      { "label": "Branding & Identity", "image": "" },
      { "label": "Marketing Materials (Flyers, Brochures, etc.)", "image": "" },
      { "label": "Website Graphics", "image": "" },
      { "label": "Social Media Graphics", "image": "" },
      { "label": "Other", "image": "" }
    ]
  },
  {
    "question": "Design style preference",
    "options": [
      { "label": "Minimalist" },
      { "label": "Modern" },
      { "label": "Vintage/Retro" },
      { "label": "Abstract" },
      { "label": "Illustrative" },
      { "label": "No preference, need expert recommendation" }
    ]
  },
  {
    "question": "Preferred color palette",
    "options": [
      { "label": "Bright & Vibrant" },
      { "label": "Muted & Neutral" },
      { "label": "Monochrome" },
      { "label": "Pastels" },
      { "label": "No preference" }
    ]
  },
  {
    question: "Job seeker traits",
    options: [
      { label: "dedicated" },
      { label: "punctual" },
      { label: "Best work" },
      { label: "budget friendly" },
    ],
  },
],
"Video Editing": [
  {
    "question": "What type of video do you need edited?",
    "options": [
      { "label": "YouTube Video", "image": "" },
      { "label": "Social Media Reel/Shorts", "image": "" },
      { "label": "Corporate/Business Video", "image": "" },
      { "label": "Event Highlights", "image": "" },
      { "label": "Music Video", "image": "" },
      { "label": "Other", "image": "" }
    ]
  },
  {
    "question": "Editing Style Preference",
    "options": [
      { "label": "Cinematic & Professional" },
      { "label": "Fast-Paced & Engaging" },
      { "label": "Minimal & Clean" },
      { "label": "VFX/Advanced Editing" },
      { "label": "No preference, need expert recommendation" }
    ]
  },
  {
    "question": "Additional Features Needed",
    "options": [
      { "label": "Color Grading" },
      { "label": "Motion Graphics & Animation" },
      { "label": "Sound Design & Effects" },
      { "label": "Subtitles & Captions" },
      { "label": "Custom Intro/Outro" },
      { "label": "No additional features" }
    ]
  },
  {
    "question": "Job seeker traits",
    "options": [
      { "label": "Creative & Innovative" },
      { "label": "Fast Delivery" },
      { "label": "Detail-Oriented" },
      { "label": "Budget-Friendly" }
    ]
  }
]

};

const Questionnaire = () => {
  const location =useLocation();
  const selectedField = location.state || {};
  console.log(selectedField);
  const [serviceType, setServiceType] = useState("Web Development");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const categoryValue = typeof selectedField === "string" ? selectedField : selectedField?.selectedField || "Web Development";
   
  const questions = allQuestions[categoryValue] || [];
 
  const filters = {};
  const handleNext = () => {
    

    // Use functional updates to ensure the latest state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].question]: selectedOption,
    }));

    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate after ensuring all answers are saved
      console.log("User Responses:", { ...answers, [questions[currentQuestion].question]: selectedOption });
      navigate("/profilesDS", { state: { selectedField, answers: { ...answers, [questions[currentQuestion].question]: selectedOption } } });
    }
    
  };
  const handleSkip = () => {
    navigate('/profiles', { state: { selectedField,filters, skipFilters: true } });
    
};


  return (
    <>
      <WeSkillNavbar />
      <div className="container d-flex justify-content-center align-items-center py-5">
        <Card className="p-5 shadow-lg rounded-4 w-100" style={{ maxWidth: "800px" }}>
          <CardContent>
            {questions.length > 0 ? (
              <>
                <h2 className="text-primary mb-4 text-center fw-bold">
                  {questions[currentQuestion]?.question}
                </h2>
                <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`option-card p-4 rounded-3 text-center shadow-sm ${
                        selectedOption === option.label ? "border border-primary shadow-lg bg-light" : "border bg-white"
                      }`}
                      style={{ width: "160px", cursor: "pointer", transition: "all 0.3s" }}
                      onClick={() => setSelectedOption(option.label)}
                    >
                      {option.image && (
                        <img
                          src={option.image}
                          alt={option.label}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: "4rem" }}
                        />
                      )}
                      <div className="fw-semibold text-secondary">{option.label}</div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <Button className="mt-3 px-4 py-2 btn-dark " onClick={handleSkip}>
                    Skip
                  </Button>
                  <Button
                    className="mt-3 px-4 py-2 btn-primary text-white"
                    onClick={handleNext}
                    disabled={!selectedOption}
                  >
                    {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
                  </Button>
                </div>
              </>
            ) : (
              <h3 className="text-center">No questions available for {serviceType}.</h3>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Questionnaire;
