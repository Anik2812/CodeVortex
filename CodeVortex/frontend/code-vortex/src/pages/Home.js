import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link, icon }) => (
  <div className="card hover:shadow-2xl">
    <div className="text-4xl text-purple-600 mb-4">{icon}</div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="mb-4 text-gray-600">{description}</p>
    <Link to={link} className="btn btn-primary">Try it out</Link>
  </div>
);

const Home = () => {
  return (
    <div className="container text-center">
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Code Vortex</h1>
      <p className="text-xl mb-12 text-white">Dive into the world of coding with our interactive learning platform!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Flashcards" 
          description="Test your knowledge with AI-generated flashcards."
          link="/flashcards"
          icon={<i className="fas fa-cards-blank"></i>}
        />
        <FeatureCard 
          title="Smart Notes" 
          description="Take and organize your coding notes with AI assistance."
          link="/notes"
          icon={<i className="fas fa-sticky-note"></i>}
        />
        <FeatureCard 
          title="AI Coding Assistant" 
          description="Get help from our AI-powered coding assistant."
          link="/ai-assistant"
          icon={<i className="fas fa-robot"></i>}
        />
      </div>
    </div>
  );
};

export default Home;