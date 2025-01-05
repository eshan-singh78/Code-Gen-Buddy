import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import darkBackground from './images/dark_bg.png';
import lightBackground from './images/light_bg.png';

function App() {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? 'vs-dark' : 'vs'; 
  const backgroundImage = isDarkMode ? `url(${darkBackground})` : `url(${lightBackground})`;

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const filterCodeByLanguage = (language, code) => {
    const jsPattern = /```js([\s\S]*?)```/;
    const javascriptPattern = /```javascript([\s\S]*?)```/;
    const pythonPattern = /```python([\s\S]*?)```/;
    const defaultPattern = /```([\s\S]*?)```/;

    let filteredCode = '';

    if (code.includes('```')) {
      switch (language) {
        case 'javascript':
          const jsMatch = code.match(jsPattern) || code.match(javascriptPattern);
          filteredCode = jsMatch ? jsMatch[1].trim() : '';
          break;
        case 'python':
          const pythonMatch = code.match(pythonPattern);
          filteredCode = pythonMatch ? pythonMatch[1].trim() : '';
          break;
        default:
          const defaultMatch = code.match(defaultPattern);
          filteredCode = defaultMatch ? defaultMatch[1].trim() : '';
      }
    } else {
      filteredCode = code.trim();
    }

    return filteredCode;
  };

  const sendPrompt = async () => {
    try {
      if (prompt.trim().toLowerCase().includes('help')) {
        alert('Please use the prompt to request code generation.');
        return;
      }

      const refinedPrompt = `${prompt}\nPlease provide ONLY the code as the response. Exclude any explanations, comments, or introductory text. The response should contain only the code block without any extra information.`;

      const response = await axios.post('http://localhost:5002/api/response-only', {
        prompt: refinedPrompt,
      });

      if (!response.data || !response.data.response) {
        alert('No code received from the API.');
        return;
      }

      const filteredCode = filterCodeByLanguage(language, response.data.response || '');
      setCode(filteredCode);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleModeChange = (event) => {
    setIsDarkMode(event.target.value === 'dark');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
        padding: 2,
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 0.3s ease',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' }}>
        Code Gen Buddy
      </Typography>
      <Typography variant="body2" paragraph sx={{ marginBottom: 2, color: isDarkMode ? 'white' : 'black' }}>
        Generate code via prompts!
      </Typography>

      <Box sx={{ width: '80%', height: '50vh', display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            lineHeight: 1.5,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          maxWidth: 500,
          marginTop: '10px',
          backgroundColor: isDarkMode ? 'black' : 'white',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <TextField
          label="Enter Prompt"
          variant="outlined"
          value={prompt}
          onChange={handlePromptChange}
          multiline
          rows={3}
          sx={{
            marginBottom: 2,
            fontSize: 14,
            backgroundColor: isDarkMode ? '#333' : 'white',
            color: isDarkMode ? 'white' : 'black',
            '& .MuiInputBase-root': {
              color: isDarkMode ? 'white' : 'black',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDarkMode ? 'white' : 'black',
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? 'white' : 'black',
            },
            '& .MuiFormHelperText-root': {
              color: isDarkMode ? 'white' : 'black',
            },
            '& .MuiInputBase-input::placeholder': {
              color: isDarkMode ? 'white' : 'black',
            },
          }}
          placeholder="Enter your prompt here."
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <FormControl sx={{ width: '48%' }}>
            <InputLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>Language</InputLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              label="Select Language"
              sx={{
                fontSize: 14,
                color: isDarkMode ? 'white' : 'black',
                '& .MuiSelect-icon': {
                  color: isDarkMode ? 'white' : 'black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'white' : 'black',
                }
              }}
            >
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: '48%' }}>
            <InputLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>Theme</InputLabel>
            <Select
              value={isDarkMode ? 'dark' : 'light'}
              onChange={handleModeChange}
              label="Theme"
              sx={{
                fontSize: 14,
                color: isDarkMode ? 'white' : 'black',
                '& .MuiSelect-icon': {
                  color: isDarkMode ? 'white' : 'black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'white' : 'black',
                }
              }}
            >
              <MenuItem value="light">Light Mode</MenuItem>
              <MenuItem value="dark">Dark Mode</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={sendPrompt}
          sx={{ height: 45, fontSize: 14 }}
        >
          Send Prompt
        </Button>
      </Box>
    </Box>
  );
}

export default App;
