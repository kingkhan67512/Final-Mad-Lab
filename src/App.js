import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './components/RegisterScreen'; // Register Screen
import LoginScreen from './components/LoginScreen'; // Login Screen
import HomeScreen from './components/HomeScreen'; // Home Screen
import CourseLibraryScreen from './components/CourseLibraryScreen'; // Course Library Screen
import CourseDetailScreen from './components/CourseDetailScreen'; // Course Detail Screen
import { addSampleCourses } from './firebase/firebaseAuth';  // Adjust the path if needed

const Stack = createStackNavigator();

function App() {
    // useEffect(() => {
    //   // Add sample courses to Firestore when the app loads
    //   addSampleCourses();
    // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />

        {/* Register Screen */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Register' }} 
        />

        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />

        {/* Course Library Screen */}
        <Stack.Screen 
          name="CourseLibrary" 
          component={CourseLibraryScreen} 
          options={{ title: 'Course Library' }} 
        />

        {/* Course Detail Screen */}
        <Stack.Screen 
          name="CourseDetail" 
          component={CourseDetailScreen} 
          options={{ title: 'Course Detail' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
