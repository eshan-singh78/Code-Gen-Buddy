# Code Gen Buddy

Code Gen Buddy is an online code editor that allows users to generate code based on prompts. The application uses the Ollama API to generate code based on a user's input, and it provides options to choose different programming languages (JavaScript and Python) and switch between light/dark themes.

## Features
- **Code Editor**: A Monaco Editor with syntax highlighting for JavaScript and Python.
- **Prompt-based Code Generation**: Users can input prompts, and the server will return generated code based on the prompt.
- **Theme Toggle**: Users can toggle between light and dark modes.
- **Language Selection**: Users can select between JavaScript and Python for code generation.

## Tech Stack
- **Frontend**: React, Monaco Editor, Material UI, Axios
- **Backend**: Node.js, Express, Axios
- **API**: Ollama API (for code generation)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- NPM or Yarn
- A running Ollama instance

### Setup

#### 1. Backend Setup
1. Clone the repository.
2. Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

3. Set up the `.env` file in the `backend` folder with the following:

```env
OLLAMA_API_URL=<your_ollama_api_url>
OLLAMA_MODEL=<your_ollama_model_name>
```

4. Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5002`.

#### 2. Frontend Setup
1. Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

2. Start the frontend server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

### Usage
- **Prompt**: Enter a prompt that asks for code generation (e.g., "Create a function that adds two numbers").
- **Send Prompt**: Click the "Send Prompt" button to request code generation. The server will return code based on the prompt, which will be displayed in the editor.
- **Language Selection**: Choose between JavaScript and Python for the code generation.
- **Theme Selection**: Switch between light and dark modes using the theme toggle.

## Folder Structure

```
/backend
    /node_modules
    .env
    server.js
    package.json

/frontend
    /node_modules
    /src
    package.json
    public/
        /images
            dark_bg.png
            light_bg.png
    App.js
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
