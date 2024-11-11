import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { remark } from "remark";
import remarkParse from "remark-parse";
import "./App.css";

export const convertCustomMarkupToMarkdown = (markup) => {
	const processor = remark().use(remarkParse); // Initialize remark with the parse plugin
	const parsed = processor.processSync(markup).toString(); // Convert to Markdown
	return parsed;
};

function App() {
	const [inputText, setInputText] = useState("");
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(false);

	// Function to handle the form submission
	const handleSummarize = async (e) => {
		setLoading(true);
		e.preventDefault();

		// API call to the backend (to be implemented later)
		try {
			const response = await fetch(
				"http://localhost:3030/api/summarize",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text: inputText }),
				}
			);

			const data = await response.json();
			setSummary(convertCustomMarkupToMarkdown(data.summary));
		} catch (error) {
			console.error("Error:", error);
			setSummary("Failed to fetch summary.");
		}
		setLoading(false);
	};

	return (
		<div className="App">
			<h1>Text Summarizer</h1>
			<form onSubmit={handleSummarize}>
				<label htmlFor="inputText">Enter your text:</label>
				<textarea
					id="inputText"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					rows="10"
					placeholder="Type or paste your text here..."
					required
				/>
				<button type="submit">Summarize</button>
			</form>
			{loading && (
				<div className="summary">
					<p>Loading...</p>
				</div>
			)}
			{summary && (
				<div className="summary">
					<h2>Summary:</h2>
					<ReactMarkdown>{summary}</ReactMarkdown>
				</div>
			)}
		</div>
	);
}

export default App;
