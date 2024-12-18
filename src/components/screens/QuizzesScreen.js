// QuizzesScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const QuizzesScreen = ({ navigation }) => {
  // Sample quizzes data
  const quizzes = [
    { id: "1", title: "JavaScript Basics", description: "Test your knowledge of JavaScript fundamentals." },
    { id: "2", title: "React Native Quiz", description: "Challenge your React Native skills." },
    { id: "3", title: "HTML & CSS", description: "Test your understanding of HTML and CSS." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quizCard}
            onPress={() => navigation.navigate("QuizDetail", { quizId: item.id })}
          >
            <Text style={styles.quizTitle}>{item.title}</Text>
            <Text style={styles.quizDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
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
    textAlign: "center",
    marginBottom: 20,
  },
  quizCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quizDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default QuizzesScreen;
