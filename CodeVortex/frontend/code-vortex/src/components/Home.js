import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Code Vortex</h1>
      <p className="text-xl mb-8">Dive into the world of coding with our interactive learning platform!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Flashcards" 
          description="Test your knowledge with AI-generated flashcards."
          link="/flashcards"
        />
        <FeatureCard 
          title="Smart Notes" 
          description="Take and organize your coding notes with AI assistance."
          link="/notes"
        />
        <FeatureCard 
          title="AI Coding Assistant" 
          description="Get help from our AI-powered coding assistant."
          link="/ai-assistant"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{description}</p>
      <Link to={link} className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-80">
        Try it out
      </Link>
    </div>
  );
};

export default Home;