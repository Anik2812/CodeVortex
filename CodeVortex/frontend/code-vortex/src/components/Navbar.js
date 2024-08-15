import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-600">Code Vortex</Link>
          <div className="flex space-x-4">
            {['Flashcards', 'Notes', 'AI Assistant'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className={`py-2 px-4 rounded-full transition-colors duration-300 ${
                  location.pathname === `/${item.toLowerCase().replace(' ', '-')}`
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;