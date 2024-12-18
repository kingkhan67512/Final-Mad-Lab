// LearningPathsScreen.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LearningPathsScreen = ({ navigation }) => {
  // Sample learning paths (you can later replace this with dynamic data)
  const learningPaths = [
    { id: "1", title: "Web Development", description: "Learn how to build websites and web applications." },
    { id: "2", title: "Mobile Development", description: "Become proficient in building mobile apps." },
    { id: "3", title: "Data Science", description: "Master data analysis, visualization, and machine learning." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Paths</Text>
      {learningPaths.map((path) => (
        <View key={path.id} style={styles.pathCard}>
          <Text style={styles.pathTitle}>{path.title}</Text>
          <Text style={styles.pathDescription}>{path.description}</Text>
          <Button
            title="View Details"
            onPress={() => navigation.navigate("LearningPathDetail", { pathId: path.id })}
          />
        </View>
      ))}
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
  pathCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pathDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});

export default LearningPathsScreen;
