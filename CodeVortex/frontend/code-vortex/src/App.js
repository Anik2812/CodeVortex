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
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;