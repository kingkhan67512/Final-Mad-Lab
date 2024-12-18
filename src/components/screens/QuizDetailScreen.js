// QuizDetailScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

const QuizDetailScreen = ({ route }) => {
  // Get the quizId passed from the previous screen
  const { quizId } = route.params;

  // Sample quiz questions based on the quizId
  const quizData = {
    "1": {
      title: "JavaScript Basics",
      questions: [
        { id: "1", question: "What is the keyword to define a variable?", options: ["let", "var", "const"], correctAnswer: "let" },
        { id: "2", question: "What does 'console.log' do?", options: ["Logs to the console", "Writes to the document", "Defines a function"], correctAnswer: "Logs to the console" },
      ],
    },
    "2": {
      title: "React Native Quiz",
      questions: [
        { id: "1", question: "What is React Native?", options: ["A web framework", "A mobile framework", "A game engine"], correctAnswer: "A mobile framework" },
        { id: "2", question: "What is used for navigation in React Native?", options: ["react-router", "react-navigation", "react-router-native"], correctAnswer: "react-navigation" },
      ],
    },
    "3": {
      title: "HTML & CSS",
      questions: [
        { id: "1", question: "Which HTML tag is used to define a hyperlink?", options: ["<a>", "<link>", "<button>"], correctAnswer: "<a>" },
        { id: "2", question: "Which property is used to change the background color in CSS?", options: ["background-color", "bg-color", "color"], correctAnswer: "background-color" },
      ],
    },
  };

  const quiz = quizData[quizId];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0); // Track score
  const [answerFeedback, setAnswerFeedback] = useState(""); // Feedback for correct/incorrect answers

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = quiz.questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    // Update score
    if (isCorrect) {
      setScore(score + 1);
      setAnswerFeedback("Correct!");
    } else {
      setAnswerFeedback(`Incorrect! The correct answer was: ${correctAnswer}`);
    }

    // Store the answer (optional, to show it later or for results page)
    setAnswers([...answers, { questionId: quiz.questions[currentQuestionIndex].id, selectedAnswer, isCorrect }]);

    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    // Display final score or navigate to results screen
    alert(`Quiz Finished! Your score: ${score}/${quiz.questions.length}`);
  };

  if (!quiz) {
    return <Text>No quiz found!</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{quiz.title}</Text>

      <Text style={styles.question}>{quiz.questions[currentQuestionIndex]?.question}</Text>

      {answerFeedback && <Text style={styles.feedback}>{answerFeedback}</Text>}

      <View style={styles.optionsContainer}>
        {quiz.questions[currentQuestionIndex]?.options.map((option, index) => (
          <Button key={index} title={option} onPress={() => handleAnswer(option)} />
        ))}
      </View>

      {currentQuestionIndex === quiz.questions.length ? (
        <Button title="Finish Quiz" onPress={handleFinishQuiz} />
      ) : (
        <Text>Question {currentQuestionIndex + 1} of {quiz.questions.length}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 15,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    color: "#00796b",
    fontWeight: "bold",
  },
});

export default QuizDetailScreen;
