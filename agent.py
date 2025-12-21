import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import create_agent

# -----------------------------
# 1. Load OpenAI API key
# -----------------------------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found! Check your .env file.")
os.environ["OPENAI_API_KEY"] = api_key

# -----------------------------
# 2. Define tools
# -----------------------------
@tool
def calculator(expression: str) -> str:
    """Evaluates a math expression safely."""
    try:
        result = eval(expression)
        return f"The result is: {result}"
    except Exception as e:
        return f"Error calculating: {str(e)}"

tools = [calculator]

# -----------------------------
# 3. Setup the AI model
# -----------------------------
model = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)

# -----------------------------
# 4. Create the agent
# -----------------------------
agent = create_agent(
    model,   # positional argument
    tools    # positional argument
)

# -----------------------------
# 5. Chat loop (using invoke)
# -----------------------------
def run_agent():
    print("AI Agent ready! Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "quit":
            print("Goodbye!")
            break
        response = agent.invoke({"input": user_input})  # invoke instead of run()
        print(f"Agent: {response['output']}")           # get output text

# -----------------------------
# 6. Run the agent
# -----------------------------
if __name__ == "__main__":
    run_agent()
