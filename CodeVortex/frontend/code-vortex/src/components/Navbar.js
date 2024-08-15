import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">Code Vortex</Link>
          <div className="flex space-x-4">
            <Link to="/flashcards" className="hover:text-secondary">Flashcards</Link>
            <Link to="/notes" className="hover:text-secondary">Notes</Link>
            <Link to="/ai-assistant" className="hover:text-secondary">AI Assistant</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;