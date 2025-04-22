import { useState, FormEvent } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/generateArticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
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
          <p className="whitespace-pre-wrap mb-4">{result.article}</p>
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
