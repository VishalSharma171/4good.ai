'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Commit {
  sha: string;
  message: string;
  summary: string;
  author: string;
  date: string;
}

export default function Home() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCommit, setActiveCommit] = useState<string | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchCommits();
    }
  };

  const fetchCommits = async () => {
    if (!owner || !repo) {
      setError('Please enter both owner and repository name');
      return;
    }

    setLoading(true);
    setError('');
    setCommits([]);

    try {
      const response = await fetch('http://localhost:8000/summarize-commits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repo_owner: owner,
          repo_name: repo,
          num_commits: 5,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch commits');
      }

      setCommits(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            GitHub Commit Summarizer
          </h1>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Repository Owner (e.g., facebook)"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Input
                placeholder="Repository Name (e.g., react)"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
            </div>

            <Button 
              onClick={fetchCommits}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Analyzing commits...</span>
                </div>
              ) : (
                'Get Commit Summaries'
              )}
            </Button>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-center">
                {error}
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          {commits.map((commit) => (
            <Card 
              key={commit.sha} 
              className={`p-6 cursor-pointer transition-all duration-300 ${
                activeCommit === commit.sha 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveCommit(activeCommit === commit.sha ? null : commit.sha)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm text-gray-500">
                    {new Date(commit.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="font-semibold text-gray-700">{commit.author}</div>
                </div>
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                  {commit.sha}
                </code>
              </div>
              
              <div className="mt-4">
                <div className="font-medium text-gray-700">Summary:</div>
                <div className="text-gray-600 mb-4">{commit.summary}</div>
                
                {activeCommit === commit.sha && (
                  <>
                    <div className="text-sm font-medium text-gray-500 mt-2">
                      Original message:
                    </div>
                    <div className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-md mt-1">
                      {commit.message}
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        {commits.length > 0 && (
          <div className="text-center text-gray-500 text-sm mt-4">
            Click on a commit card to view the full message
          </div>
        )}
      </div>
    </main>
  );
}