import axios from "axios";

const API_URL = "https://opentdb.com/api.php?amount=5&category=18&type=multiple";

export const fetchQuizData = async () => {
  try {
    console.log("Fetching quiz data from API..."); // ✅ Debugging step
    const response = await axios.get(API_URL);
    console.log("Raw API Response:", response.data); // ✅ Log response to see data

    if (!response.data.results) {
      console.error("No results found in API response!");
      return { questions: [] };
    }

    // Convert API response to match expected format
    const formattedQuestions = response.data.results.map((q) => ({
      question: q.question,
      options: [
        ...q.incorrect_answers.map((text) => ({ text, isCorrect: false })),
        { text: q.correct_answer, isCorrect: true }
      ].sort(() => Math.random() - 0.5) // Shuffle options
    }));

    console.log("Formatted Questions:", formattedQuestions); // ✅ Check processed questions
    return { questions: formattedQuestions };
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return { questions: [] }; // Prevents app from crashing
  }
};
