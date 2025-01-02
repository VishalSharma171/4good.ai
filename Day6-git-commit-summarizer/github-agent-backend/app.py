from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
from typing import List
import groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Environment variables
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


print(GITHUB_TOKEN)
print(GROQ_API_KEY)

# Validate environment variables
if not GITHUB_TOKEN or not GROQ_API_KEY:
    raise ValueError(
        "Missing environment variables. Please ensure GITHUB_TOKEN and GROQ_API_KEY are set in .env file"
    )

# Initialize Groq client
groq_client = groq.Groq(api_key=GROQ_API_KEY)

class CommitRequest(BaseModel):
    repo_owner: str
    repo_name: str
    num_commits: int = 5

class Commit(BaseModel):
    sha: str
    message: str
    summary: str
    author: str
    date: str

async def get_commits(owner: str, repo: str, num_commits: int) -> List[dict]:
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.github.com/repos/{owner}/{repo}/commits?per_page={num_commits}",
            headers=headers
        )
        
        print(response)
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch commits")
        
        return response.json()

async def summarize_commit(commit_message: str) -> str:
    prompt = f"""Summarize this commit message concisely in one line:
    {commit_message}
    Summary:"""
    
    response = groq_client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="mixtral-8x7b-32768",
        temperature=0.3,
        max_tokens=100
    )
    
    return response.choices[0].message.content.strip()

@app.post("/summarize-commits")
async def summarize_commits(request: CommitRequest):
    commits = await get_commits(request.repo_owner, request.repo_name, request.num_commits)
    
    summarized_commits = []
    for commit in commits:
        summary = await summarize_commit(commit["commit"]["message"])
        summarized_commits.append(Commit(
            sha=commit["sha"][:7],
            message=commit["commit"]["message"],
            summary=summary,
            author=commit["commit"]["author"]["name"],
            date=commit["commit"]["author"]["date"]
        ))
    
    return summarized_commits

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)