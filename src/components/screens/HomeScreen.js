import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "../ui/card";

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.replace("Login");
  };

  const features = [
    { title: "Course Library", icon: "book-outline", onPress: () => navigation.navigate("CourseLibrary") },
    { title: "Learning Paths", icon: "map-outline", onPress: () => navigation.navigate("LearningPaths") },
    { title: "Quizzes", icon: "file-question-outline", onPress: () => navigation.navigate("Quizzes") },
    { title: "Gamification", icon: "trophy-outline", onPress: () => navigation.navigate("Gamification") },
    { title: "Community", icon: "account-group-outline", onPress: () => navigation.navigate("Community") },
    { title: "Progress", icon: "chart-line", onPress: () => navigation.navigate("Progress") },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.cardWrapper}>
              <Card style={styles.card}>
                <TouchableOpacity onPress={feature.onPress} style={styles.cardContent}>
                  <Icon name={feature.icon} size={24} color="#333" />
                  <Text style={styles.cardTitle}>{feature.title}</Text>
                </TouchableOpacity>
              </Card>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#e53946",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    zIndex: 1,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  cardContainer: {
    marginTop:'20%',
    flexDirection: "row", // Arrange cards in a row
    flexWrap: "wrap", // Allow wrapping to the next line
    justifyContent: "space-between", // Space between cards
    paddingHorizontal: 16, // Padding around the container
  },
  cardWrapper: {
    width: "50%", // Two cards per row (100% - spacing)
    marginBottom: 16, // Space between rows
  },
  card: {
    height: 120, // Optional: Set a consistent height for cards
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
    color: "#333",
  },
});

export default HomeScreen;
