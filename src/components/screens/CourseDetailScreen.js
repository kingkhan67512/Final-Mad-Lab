import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import {db} from '../../firebase/firebaseConfig'
import { getDoc,doc } from 'firebase/firestore'; // Firestore imports

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params; // Get the courseId from the navigation params
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course document
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);
    
        if (courseDoc.exists()) {
          const courseData = courseDoc.data();    
          // Now fetch the referenced course detail document
          const courseDetailRef = courseData.courseDetailRef;  // Assuming 'courseDetailRef' is the field in the 'courses' document
          const courseDetailDoc = await getDoc(courseDetailRef);
    
          if (courseDetailDoc.exists()) {
            console.log('Course Detail Data:', courseDetailDoc.data());
            // Now you can set the course and course details into your state
            setCourseDetails(courseDetailDoc.data());
          } else {
            console.log('No course detail found!');
          }
        } else {
          console.log('No such course!');
        }
      } catch (err) {
        console.error('Error fetching course details: ', err);
      }
      setLoading(false)
    };
  
    fetchCourseDetails();
  }, [courseId]);
    
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
