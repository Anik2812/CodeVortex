import React, { useState, useEffect } from 'react';
import { fetchFlashcards } from '../api/api';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards()
      .then(response => {
        setFlashcards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
        setLoading(false);
      });
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  if (loading) {
    return <div className="container text-center text-white">Loading flashcards...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Flashcards</h1>
      {flashcards.length > 0 ? (
        <div className="card">
          <div 
            className={`flashcard mb-8 h-64 ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <p className="text-xl">{flashcards[currentCard].question}</p>
              </div>
              <div className="flashcard-back">
                <p className="text-xl">{flashcards[currentCard].answer}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={prevCard} className="btn btn-primary">Previous</button>
            <button onClick={nextCard} className="btn btn-primary">Next</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">No flashcards available.</p>
      )}
    </div>
  );
};

export default Flashcards;