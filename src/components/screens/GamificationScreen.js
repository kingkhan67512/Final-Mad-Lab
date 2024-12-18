// GamificationScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const GamificationScreen = ({ navigation }) => {
  // Sample user data (replace with actual data from your database)
  const [userData, setUserData] = useState({
    points: 150,
    badges: ["JavaScript Master", "React Native Pro", "CSS Wizard"],
    leaderboard: [
      { rank: 1, username: "User1", points: 500 },
      { rank: 2, username: "User2", points: 450 },
      { rank: 3, username: "User3", points: 400 },
    ],
  });

  // Fetch actual data from Firestore or other sources in real app
  useEffect(() => {
    // Replace with Firestore data fetching logic
    // For example, you might use Firestore's `getDoc` or `getDocs` to fetch user achievements and points
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Gamification</Text>

        {/* Points Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Points</Text>
          <Text style={styles.points}>{userData.points}</Text>
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Badges</Text>
          {userData.badges.length === 0 ? (
            <Text>No badges earned yet!</Text>
          ) : (
            userData.badges.map((badge, index) => (
              <Text key={index} style={styles.badge}>{badge}</Text>
            ))
          )}
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          {userData.leaderboard.map((user, index) => (
            <View key={index} style={styles.leaderboardItem}>
              <Text style={styles.rank}>#{user.rank}</Text>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.points}>{user.points} points</Text>
            </View>
          ))}
        </View>

        {/* Button to navigate to another screen (optional) */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Achievements")} // Replace "Achievements" with actual screen name
        >
          <Text style={styles.buttonText}>View Achievements</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  points: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4caf50", // Green color for points
  },
  badge: {
    fontSize: 16,
    color: "#3f51b5", // Blue color for badges
    marginBottom: 5,
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "#6200ea", // Purple color for button
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GamificationScreen;
