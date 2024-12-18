// ProgressScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid, ScrollView } from 'react-native';
import { db } from '../../firebase/firebaseConfig'; // Make sure this path is correct for your Firebase config
import { collection, getDocs } from 'firebase/firestore';

const ProgressScreen = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user progress data from Firestore (you can modify this to match your Firestore structure)
  const fetchProgressData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'userProgress'));
      const progressDataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProgressData(progressDataArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData(); // Fetch progress data when screen loads
  }, []);

  // Render progress bar for each course or achievement
  const renderProgressBar = (course) => {
    return (
      <View style={styles.progressContainer} key={course.id}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={course.completion / 100} // Assuming 'completion' is a percentage
        />
        <Text style={styles.completionText}>{course.completion}% Completed</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading progress data...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.progressList}>
          {progressData.length === 0 ? (
            <Text>No progress data available.</Text>
          ) : (
            progressData.map((course) => renderProgressBar(course))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  progressList: {
    paddingBottom: 20,
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
});

export default ProgressScreen;
