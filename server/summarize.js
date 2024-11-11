const { gemini_summarize } = require("./gemini");

const summarizeText = async (text) => {
	try {
		const response = await gemini_summarize(text);
		return response;
	} catch (error) {
		console.error(`Summarization failed: ${error.message}`);
	}
};

module.exports = {
	summarizeText,
};
