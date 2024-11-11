const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("./keys");

const apiKey = GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt =
	"You will be provided with a text. You have to summarize the text in a concise and simple language, highlighting all the important points.";

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro",
	systemInstruction: systemPrompt,
});

const generationConfig = {
	temperature: 0.4,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

const example_text =
	"Artificial Intelligence (AI) is rapidly transforming many industries, with healthcare being one of the most significant areas of change. In recent years, AI has begun to play a major role in the diagnosis, treatment, and management of medical conditions. By analyzing vast amounts of medical data, AI systems can identify patterns and make predictions that help doctors provide more accurate and personalized care. One of the key areas where AI is having a profound impact is in medical imaging. Technologies such as computer vision and deep learning algorithms are being used to analyze medical images like X-rays, MRIs, and CT scans. AI systems can detect subtle patterns in the images that may be missed by human doctors, leading to earlier diagnoses of conditions like cancer, heart disease, and neurological disorders. For example, AI-powered tools can identify tumors in mammograms with a level of accuracy that matches or even surpasses that of experienced radiologists. AI is also being applied to predictive analytics, where machine learning models are trained on patient data to predict the likelihood of certain health outcomes. For example, AI can help identify patients at high risk for conditions like diabetes or heart disease, allowing healthcare providers to intervene earlier and potentially prevent these conditions from developing. Similarly, AI algorithms can analyze patient data to predict the likelihood of a patient developing complications after surgery, allowing doctors to take preventive measures. The use of AI in drug discovery is another area where the technology is showing great promise. AI can analyze the chemical composition of various compounds and predict their potential to be developed into effective drugs. This significantly speeds up the process of drug development and reduces the cost of bringing new treatments to market. In fact, AI is already being used to help identify promising drug candidates for diseases such as cancer, Alzheimer's, and COVID-19. AI is also being used to improve the patient experience. Virtual assistants powered by AI can provide patients with information about their conditions, help schedule appointments, and even remind patients to take their medications. In addition, AI-powered chatbots are being used to handle administrative tasks, such as answering common patient queries and processing insurance claims. This helps reduce the administrative burden on healthcare providers, allowing them to focus more on direct patient care. Despite the many benefits, the integration of AI into healthcare also presents several challenges. One of the most significant concerns is the issue of data privacy and security. AI systems rely on vast amounts of patient data to make accurate predictions, but this raises concerns about the confidentiality of personal health information. Ensuring that patient data is protected from breaches and misuse is a major priority for healthcare providers and policymakers alike. Another challenge is the potential for bias in AI algorithms. AI systems are only as good as the data they are trained on, and if that data is biased in any way, the AI's predictions can be biased as well. This could lead to healthcare disparities, with certain patient groups receiving less accurate diagnoses or treatment recommendations. To address this, it’s essential to ensure that AI systems are trained on diverse and representative datasets. Despite these challenges, the future of AI in healthcare looks incredibly promising. With continued advancements in machine learning and AI technology, healthcare providers will be able to deliver more personalized, efficient, and effective care to patients. As AI becomes increasingly integrated into healthcare systems, it has the potential to revolutionize the way we approach medical care and ultimately improve health outcomes for people around the world.";

async function gemini_summarize(text) {
	try {
		const chatSession = model.startChat({
			generationConfig,
			history: [
				{
					role: "user",
					parts: [
						{
							text: example_text,
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "## AI in Healthcare: A Revolution in the Making\n\nArtificial intelligence (AI) is rapidly transforming healthcare by analyzing massive medical datasets to improve diagnosis, treatment, and patient care. \n\n**Key Applications:**\n\n* **Medical Imaging:** AI-powered tools analyze medical images like X-rays and MRIs to detect subtle patterns, leading to earlier diagnoses of conditions like cancer.\n* **Predictive Analytics:** AI algorithms predict health outcomes, identifying high-risk patients for conditions like diabetes and aiding in preventive measures.\n* **Drug Discovery:** AI analyzes chemical compounds to accelerate and reduce the cost of developing new drugs.\n* **Patient Experience:** Virtual assistants and chatbots provide information, schedule appointments, and handle administrative tasks, improving patient convenience and freeing up healthcare providers' time.\n\n**Challenges:**\n\n* **Data Privacy and Security:** Ensuring the protection of sensitive patient data is crucial.\n* **Bias in Algorithms:** Training AI on biased datasets can lead to inaccurate predictions and healthcare disparities. \n\n**Future Outlook:**\n\nDespite challenges, AI holds immense potential to revolutionize healthcare, enabling more personalized and efficient care delivery, ultimately improving health outcomes worldwide. \n",
						},
					],
				},
			],
		});

		const result = await chatSession.sendMessage(`${text}`);
		return result.response.text();
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = {
	gemini_summarize,
};
