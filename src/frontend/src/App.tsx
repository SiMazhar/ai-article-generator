// Import statements
import { useState, FormEvent } from "react";
import ReactLoading from 'react-loading'; 

export default function App() {
  // State declarations
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<{ article: string; images: { prompt: string; url: string }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission and API request with timeout
  const handleSubmit = async (e: FormEvent) => {
    // Prevent default form action
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Setup for request timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const res = await fetch("http://localhost:5000/api/generateArticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
        signal: controller.signal
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.name === "AbortError" ? "Request timed out" : err.message);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* App header */}
      <h1 className="text-2xl mb-4">AI "Top Five" Article Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Topic input field */}
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Enter a topic…"
          className="border p-2 mr-2"
        />
        {/* Generate button */}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2">
          Generate
        </button>
        {/* Loading spinner displayed when request is in progress */}
        {loading && (
          <div className="flex justify-center items-center w-full my-4">
            <ReactLoading type="balls" color="#213547" height={35} width={35} />
          </div>
        )}
      </form>

      {/* Display error message if any */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Render article and images when available */}
      {result && (
        <div>
          <h2 className="text-xl mb-2">Article</h2>
          <div className="article-container">
            {(() => {
              // Split article by paragraphs
              const paragraphs = result.article.split("\n\n");
              return (
                <>
                  {/* Render first three paragraphs without images */}
                  {paragraphs.slice(0, 3).map((para, idx) => (
                    <div key={idx} className="mb-4">
                      <p>{para}</p>
                    </div>
                  ))}
                  {/* Render remaining paragraphs in pairs with an image between */}
                  {(() => {
                    const remaining = paragraphs.slice(3);
                    const groups = [];
                    for (let i = 0; i < remaining.length; i += 2) {
                      groups.push(remaining.slice(i, i + 2));
                    }
                    return groups.map((group, groupIdx) => (
                      <div key={groupIdx} className="mb-4">
                        {group[0] && (
                          <div className="mb-2">
                            <p>{group[0]}</p>
                          </div>
                        )}
                        {result.images[groupIdx] && (
                          <div className="my-2">
                            <img
                              src={result.images[groupIdx].url}
                              alt={result.images[groupIdx].prompt}
                              className="border"
                            />
                          </div>
                        )}
                        {group[1] && (
                          <div className="mt-2">
                            <p>{group[1]}</p>
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
