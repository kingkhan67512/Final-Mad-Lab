import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore imports

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params; // Get the courseId from the navigation params
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details from the 'CourseDetail' collection
        const courseDocRef = doc(db, 'Courses', courseId); // Fetch using courseId
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          setCourseDetails(courseDoc.data());
        } else {
          console.log('No such course!');
        }
      } catch (err) {
        console.error('Error fetching course details: ', err);
      }
      setLoading(false);
    };

    fetchCourseDetails();
  }, [courseId]); // Fetch data whenever courseId changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {courseDetails ? (
        <>
          <Text style={styles.title}>{courseDetails.title}</Text>
          <Text style={styles.description}>{courseDetails.description}</Text>
          <Text style={styles.content}>{courseDetails.content}</Text>
          <Text style={styles.duration}>Duration: {courseDetails.duration}</Text>
          <Text style={styles.difficulty}>Difficulty: {courseDetails.difficulty}</Text>
          <Button title="Start Course" onPress={() => alert('Course Started!')} />
        </>
      ) : (
        <Text>No course data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    marginBottom: 20,
  },
  duration: {
    fontSize: 14,
    marginBottom: 20,
  },
  difficulty: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default CourseDetailScreen;
