require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let notes = [];

app.get('/api/flashcards', async (req, res) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: "Generate 5 coding flashcards with questions and answers" }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    const flashcards = parseFlashcardsFromResponse(response.data);
    res.json(flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const { content } = req.body;
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: `Enhance this coding note: ${content}` }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    const enhancedNote = {
      id: Date.now(),
      content: response.data.candidates[0].content.parts[0].text
    };
    notes.push(enhancedNote);
    res.status(201).json(enhancedNote);
  } catch (error) {
    console.error('Error enhancing note:', error);
    res.status(500).json({ error: 'Failed to enhance note' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

app.post('/api/ai-assistant', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: `Answer this coding question: ${message}` }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    res.json({ message: aiResponse });
  } catch (error) {
    console.error('Error getting AI response:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function parseFlashcardsFromResponse(response) {
  const text = response.candidates[0].content.parts[0].text;
  const lines = text.split('\n');
  const flashcards = [];
  let currentCard = {};

  for (const line of lines) {
    if (line.startsWith('Q:')) {
      if (currentCard.question) {
        flashcards.push(currentCard);
        currentCard = {};
      }
      currentCard.question = line.slice(2).trim();
    } else if (line.startsWith('A:')) {
      currentCard.answer = line.slice(2).trim();
    }
  }

  if (currentCard.question) {
    flashcards.push(currentCard);
  }

  return flashcards;
}