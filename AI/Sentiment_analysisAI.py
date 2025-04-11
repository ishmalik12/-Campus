import pandas as pd
import joblib
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

import pandas as pd

# Load dataset
df = pd.read_csv("C:\\Users\\Dakshyani Murari\\OneDrive\\Desktop\\-Campus\\AI\\DataSet.csv")

# Load trained model
model = joblib.load("C:\\Users\Dakshyani Murari\\OneDrive\\Desktop\\-Campus\\sentiment_model.pkl")


# Load SpaCy model for text processing
nlp = spacy.load("en_core_web_sm")

synonym_mapping = {
    "creative": ["creative", "creativity", "excellent creation", "imaginative", "original", "artistic", "visionary", "inspired"],
    "dedicated": ["dedicated", "hardworking", "effort", "commitment", "devoted", "persistent", "determined", "focused", "diligent"],
    "professional": ["professional", "expert", "specialist", "competent", "qualified", "experienced", "proficient", "adept"],
    "efficient": ["efficient", "quick", "fast", "time-saving",  "effective", "organized", "streamlined"],
    "friendly": ["friendly", "kind", "polite", "helpful", "supportive", "approachable", "open", "easy to talk", "comfortable", "warm", "welcoming", "generous", "empathetic"],
    "reliable": ["reliable", "trustworthy", "consistent", "dependable", "responsible", "loyal", "faithful", "steadfast"],
    "best": ["best", "amazing", "fantastic", "loved", "great", "wonderful", "outstanding", "exceptional", "superb", "remarkable"],
    "leadership": ["leader", "leadership", "influential", "mentor", "guiding", "captain", "role model"],
    "teamwork": ["team player", "collaborative", "cooperative", "cohesive", "group-oriented", "works well with others"],
    "good communication": ["communication", "articulate", "expressive", "eloquent", "persuasive", "clear", "concise", "good speaker"],
    "value for money": ["value for money", "affordable", "cost-effective", "budget-friendly", "worth the price", "economical", "reasonable price", "great deal", "good investment", "bang for the buck"],
    "knowledgeable": ["knowledgeable", "well-informed", "subject expert", "learned", "intellectual", "scholarly", "educational"],
    "patient": ["patient", "calm", "understanding", "tolerant", "composed", ],
    "clear explanation": ["explained clearly", "easy to understand", "clarified", "simplified", "broken down", "step-by-step", "good explanation"],
    "engaging": ["engaging", "interactive", "fun", "interesting", "captivating",],
    "punctual": ["punctual", "on time", "timely", "never late", "regular", "disciplined"],
    "collaborative": ["collaborative", "team effort", "worked together", "peer support", "group work"],
    "motivating": ["motivating", "encouraging", "uplifting", "inspiring"],
    "resource sharing": ["shared notes", "resources", "PDFs", "links", "documents", "study material"],
    "productive sessions": ["productive", "focus", "helped learn", "efficient study", "goal oriented"],
    "friendly environment": ["friendly", "easy to talk"],
    "on-time delivery": ["on time", "before deadline", "timely", "fast delivery", "punctual"],
    "well-researched": ["well-researched", "in-depth", "accurate", "detailed", "credible sources"],
    "plagiarism-free": ["plagiarism-free", "original content", "authentic", "unique writing"],
    "good formatting": ["well formatted", "neat layout", "structured", "proper citation", "presentation"],
    "quality content": ["quality", "high standard", "error-free", "no grammar mistakes", "clear writing"],
    "problem-solver": ["problem solver", "debugged", "fixed issue", "resolved", "solution-oriented", "troubleshooter", "resourceful", "analytical", "strategic thinker"],
    "technically sound": ["technically sound", "skilled", "expert"],
    "quick delivery": ["fast turnaround", "delivered on time", "prompt response"],
    "innovative solutions": ["innovative", "smart approach", "creative coding", "custom solution", "unique fix", "pioneering", "groundbreaking", "revolutionary", "cutting-edge", "forward-thinking", "inventive" ],
    "clear communication": ["communicated clearly", "explained solution", "shared updates", "easy to understand"],
    "math": ["math", "mathematics", "algebra", "geometry", "calculus", "trigonometry", "arithmetic", "equations", "formulas"],
    "science": ["science", "physics", "chemistry", "biology", "scientific", "experiment", "lab", "theory", "concepts"],
    "english": ["english", "grammar", "literature", "essay", "writing", "vocabulary", "comprehension", "punctuation", "spoken"],
    "computer science": ["computer", "coding", "programming", "python", "java", "c++", "software", "technology", "debugging"],
    "economics": ["economics", "finance", "market", "budget", "demand", "supply", "macro", "micro", "economy", "investment"],
    "business": ["business", "management", "marketing", "strategy", "entrepreneurship", "startup", "organization"],
    "Finance":["finance", "accounting", "investment", "budgeting", "money management", "taxation", "financial planning", "portfolio"],
    "Data Science":["data analysis", "data-driven", "statistics", "data sets", "analytics", "EDA", "machine learning", "deep learning","Python", "R", "SQL", "Excel", "Tableau", "Power BI", "Jupyter", "Pandas", "NumPy", "Scikit-learn","interpreting data", "insightful", "trend analysis", "correlation", "prediction", "data visualization", "explanation of graphs"],
    "history": ["history", "historical", "ancient", "war", "revolution", "empire", "timeline", "event", "past"],
    "geography": ["geography", "map", "climate", "continent", "ocean", "landform", "location", "region", "weather"],
    "hindi": ["hindi", "vocabulary", "bharat", "sahitya", "language", "grammar", "kavita", "anuvad"],
    "accounts": ["accounts", "accounting", "balance sheet", "ledger", "debit", "credit", "assets", "liabilities", "journal"],
    "law": ["law", "legal", "case", "act", "court", "justice", "rules", "regulations", "constitution", "judgment"],
    "Figma":["Figma"],
    "Adobe": ["Adobe"],
    "Photoshop":["Photoshop"],
    "Illustrator": ["Illustrator"],
    "Canva":["Canva"], 
    "color theory": ["Colour theory"]

}


# Convert to lowercase for easier matching
keyword_badges = {word.lower(): badge for badge, words in synonym_mapping.items() for word in words}


# Function to check if a word is negated
def is_negated(doc, phrase):
    words = phrase.split()  # Split multi-word phrases
    for i, token in enumerate(doc):
        if token.text.lower() == words[0]:  # Match first word in phrase
            # Ensure the whole phrase matches
            if all(i + j < len(doc) and doc[i + j].text.lower() == words[j] for j in range(len(words))):
                # Check if any negation word appears before or affects the phrase
                for ancestor in token.ancestors:
                    if ancestor.dep_ in ("neg", "aux") and ancestor.text.lower() in ("not", "never", "no", "could", "could have", "nor", "neither"):
                        return True
                # Check negation words before the phrase
                if i > 0 and doc[i - 1].text.lower() in ("not", "never", "no", "could", "could have", "nor", "neither"):
                    return True
    return False

# Sentiment prediction function
def predict_sentiment(review):
    return model.predict([review])[0]  # Predict using trained model

# Function to generate badges while ignoring negated words
def generate_badges(review, sentiment):
    if sentiment == "Positive":
        doc = nlp(review.lower())  # Process the review with spaCy
        badges = {badge for keyword, badge in keyword_badges.items() 
                  if keyword in review.lower() and not is_negated(doc, keyword)}
        return list(badges) if badges else ["No Specific Badge"]
    else:
        return ["No Badges"]


# Example Reviews
reviews = [
    "The work which I received was really pathetic",
    "I appreciate the dedication and effort of Ish",
    "Ish has excellent creativity and original ideas",
    "The specialist did an expert job in this project",
    "He is very friendly and kind towards others",
    "Ish is a problem solver",
    "Great work, value for money is satified",
    "Suman is rude in nature",
    "working with ram was an absolute pleasure they delievered high quality work on time . this communication was clear and he was always open to feedback ",
    "communication could have been  a bit more responsive but overall they deleivered what was promised",
    "work was not on time"
    "The tutor was incredibly patient and explained every concept clearly.He taught me Maths. Their approach made even tough topics easy to understand."
]

for review in reviews:
    sentiment = predict_sentiment(review)
    badges = generate_badges(review, sentiment)

    print(f"Review: {review}")
    print(f"Predicted Sentiment: {sentiment}")
    print(f"Assigned Badges: {', '.join(badges)}\n")

