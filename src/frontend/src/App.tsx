import { useState, FormEvent } from "react";

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
      </form>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {result && (
        <div>
          <h2 className="text-xl mb-2">Article</h2>
          {/* Wrap article text in a div that uses the .article-container class */}
          <div className="article-container">
            <p className="mb-4">
              {result.article.split("\n\n").map((para, idx, arr) => (
                <span key={idx}>
                  {para}
                  {idx !== arr.length - 1 && (<><br /><br /><br /><br /><br /></>)}
                </span>
              ))}
            </p>
          </div>
          <h3 className="text-lg mb-2">Images</h3>
          <ul>
            {result.images.map((img, i) => (
              <li key={i} className="mb-4">
                <strong>Prompt:</strong> {img.prompt}
                <br />
                <img src={img.url} alt={img.prompt} className="mt-2 border" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
