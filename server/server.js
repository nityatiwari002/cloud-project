const express = require("express");
const cors = require("cors");
const { summarizeText } = require("./summarize");

const app = express();
const PORT = 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Route for text summarization
app.post("/api/summarize", async (req, res) => {
	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ error: "No text provided" });
	}
	const summary = await summarizeText(text);
	console.log(summary);
	res.json({ summary });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
