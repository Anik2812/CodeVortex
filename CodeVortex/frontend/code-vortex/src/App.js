import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Notes from './pages/Notes';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
        <footer className="bg-white text-center py-4 mt-8">
          <p>&copy; 2024 Code Vortex. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;