// LearningPathDetailScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LearningPathDetailScreen = ({ route }) => {
  // Retrieve the pathId passed from the previous screen
  const { pathId } = route.params;

  // You can fetch real details based on the pathId from a database or API, but for now, we'll use sample data.
  const pathDetails = {
    "1": { title: "Web Development", details: "Learn HTML, CSS, JavaScript, and React to build websites." },
    "2": { title: "Mobile Development", details: "Learn React Native and Flutter to build mobile apps." },
    "3": { title: "Data Science", details: "Learn Python, data analysis, and machine learning techniques." },
  };

  const path = pathDetails[pathId];

  if (!path) {
    return (
      <View style={styles.container}>
        <Text>No details found for this learning path.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{path.title}</Text>
      <Text style={styles.details}>{path.details}</Text>
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
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#555",
  },
});

export default LearningPathDetailScreen;
