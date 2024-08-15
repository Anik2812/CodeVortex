import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('/api/flashcards');
      setFlashcards(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setLoading(false);
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  if (loading) {
    return <div className="text-center">Loading flashcards...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Flashcards</h1>
      {flashcards.length > 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div 
            className={`flashcard cursor-pointer mb-8 h-64 ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front flex items-center justify-center h-full">
                <p className="text-xl">{flashcards[currentCard].question}</p>
              </div>
              <div className="flashcard-back flex items-center justify-center h-full">
                <p className="text-xl">{flashcards[currentCard].answer}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={prevCard} className="bg-primary text-white px-4 py-2 rounded">Previous</button>
            <button onClick={nextCard} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      ) : (
        <p className="text-center">No flashcards available.</p>
      )}
    </div>
  );
};

export default Flashcards;