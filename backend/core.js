require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_API_URL = process.env.OLLAMA_API_URL;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL;

app.post('/api/full-result', async (req, res) => {
    let { prompt } = req.body;
    prompt += "\nProvide only the code as output. Do not include any explanations, comments, or introductory text.";
    try {
      const response = await axios.post(OLLAMA_API_URL, {
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching full result:', error.message);
    res.status(500).json({ error: 'Failed to fetch full result' });
  }
});

app.post('/api/response-only', async (req, res) => {
    let { prompt } = req.body;
    prompt += "\nProvide only the code as output. Do not include any explanations, comments, or introductory text.";
    try {
      const apiResponse = await axios.post(OLLAMA_API_URL, {
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      });
      const codeResponse = apiResponse.data.response;
      if (!codeResponse) {
        throw new Error('Response field is missing in Ollama API response');
      }
      res.json({ response: codeResponse });
    } catch (error) {
      console.error('Error fetching response only:', error.message);
      res.status(500).json({ error: 'Failed to fetch response only' });
    }
  });

const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
