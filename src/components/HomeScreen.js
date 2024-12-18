// HomeScreen.js
import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase/firebaseConfig';  // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';  // Functions to fetch data

const HomeScreen = ({ navigation }) => {
  // Logout logic (Navigate back to Login screen)
  const handleLogout = () => {
    navigation.replace('Login'); // replace ensures the user can't go back to Home after logging out
  };
  const [courses, setCourses] = useState([]); // State to store courses
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch courses from Firestore
  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));  // Fetch all courses from the 'courses' collection
      const coursesData = querySnapshot.docs.map(doc => doc.data());  // Get data of each document
      setCourses(coursesData);  // Update state with the fetched courses
      setLoading(false);  // Stop loading when data is fetched
    } catch (error) {
      console.error("Error fetching courses: ", error);
      setLoading(false);  // Stop loading on error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logout button at the top-right */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Example Buttons (add more as needed) */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Chose Course" 
          onPress={() => navigation.navigate('CourseLibrary')} // Navigate to Course screen (example)
        />
        <Button 
          title="Progress Tracker" 
          onPress={() => navigation.navigate('Progress')} // Navigate to Progress screen (example)
        />
      </View>

      {/* Additional components could be added below */}
      <Text style={styles.subtitle}>Your Progress:</Text>
      {/* Add any progress visualization or dynamic content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#e53946', // Red for logout
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60, // Space from the logout button
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40, // Space between the title and buttons
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    color: '#444',
  },
});

export default HomeScreen;
