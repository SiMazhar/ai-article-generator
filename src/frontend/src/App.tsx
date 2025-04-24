import { useState, FormEvent } from "react";
import ReactLoading from 'react-loading'; // added import for loading spinner

export default function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<{ article: string; images: { prompt: string; url: string }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Create an AbortController to timeout the request after 120 seconds.
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
      <h1 className="text-2xl mb-4">AI Article Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Enter a topic…"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Generate
        </button>
        {/* Moved spinner inside the form, directly under the button */}
        {loading && (
          <div className="flex justify-center items-center w-full my-4">
            <ReactLoading type="balls" color="#213547" height={35} width={35} />
          </div>
        )}
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}

      {result && (
        <div>
          <h2 className="text-xl mb-2">Article</h2>
          <div className="article-container">
            {(() => {
              const paragraphs = result.article.split("\n\n");
              return (
                <>
                  {/* Render the first two paragraphs without images */}
                  {paragraphs.slice(0, 2).map((para, idx) => (
                    <div key={idx} className="mb-4">
                      <p>{para}</p>
                    </div>
                  ))}
                  {/* For subsequent paragraphs, group in pairs and insert an image between them */}
                  {(() => {
                    const remaining = paragraphs.slice(2);
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
