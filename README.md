# AI Agent

A simple AI-powered agent built with **LangChain**, **LangGraph**, and **OpenAI API**. This agent can answer questions, perform calculations, and demonstrates a ReAct-style AI agent using tools.

---

## Features

- Uses **OpenAI GPT models** (`gpt-4o-mini`) for natural language responses.  
- Integrates a simple **calculator tool** to perform math operations.  
- Interactive **command-line chat interface**.  
- Modular structure: easy to add more tools in the future.  

---

## Project Structure

ai-agent/
├── .venv/ # Virtual environment
├── .env # Environment variables (API keys)
├── agent.py # Main AI agent script
├── README.md # Project documentation
├── pyproject.toml # Project dependencies
├── uv.lock # Dependency lock file
└── .cache/ # Cache folder (optional)

---

## Setup Instructions

 **Clone the repository:**

```bash
git clone <your-repo-url>
cd ai-agent

Activate virtual environment (Windows PowerShell):

.venv\Scripts\Activate.ps1


Install dependencies using UV (or pip):

uv pip install langchain langchain-openai langgraph python-dotenv


Add your OpenAI API key:

Create a .env file in the root folder:

OPENAI_API_KEY=your_openai_api_key_here


Run the AI agent:

python agent.py

Usage

Once running, type your question or calculation.

Example:

You: What is 25 * 18 + 7?
Agent: The result is: 457


Type quit to exit.

Notes

Make sure your OpenAI API quota is sufficient; otherwise, you may get a RateLimitError.

You can expand the agent by adding more @tool functions in agent.py.

License

MIT License © 2025 Mohd Ubaid


---

If you want, I can also **make it look more flashy for GitHub**, with a **screenshot of your AI agent in action** and **badges for Python version / OpenAI usage**. It will make your project look super professional for your portfolio.  

Do you want me to do that next?