import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './components/screens/RegisterScreen'; // Register Screen
import LoginScreen from './components/screens/LoginScreen'; // Login Screen
import HomeScreen from './components/screens/HomeScreen'; // Home Screen
import CourseLibraryScreen from './components/screens/CourseLibraryScreen'; // Course Library Screen
import CourseDetailScreen from './components/screens/CourseDetailScreen'; // Course Detail Screen
import LearningPathsScreen from "./components/screens/LearningPathsScreen"; // Import the new screen
import LearningPathDetailScreen from "./components/screens/LearningPathDetailScreen"; // Import the detail screen
import QuizzesScreen from "./components/screens/QuizzesScreen";
import QuizDetailScreen from "./components/screens/QuizDetailScreen";  // Import the new quiz detail screen
import GamificationScreen from "./components/screens/GamificationScreen"; // Import the new Gamification screen
import CommunityScreen from "./components/screens/CommunityScreen"; // Import the Community screen
import ProgressScreen from "./components/screens/ProgressScreen"; // Import the Progress screen


const Stack = createStackNavigator();

function App() {
    // useEffect(() => {
    //   // Add sample courses to Firestore when the app loads
    //   populateFirestore();  // Call this function to populate data in Firestore
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
          options={{ title: 'Welcome to Your Learning Journey' }} 
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
        <Stack.Screen name="LearningPaths" 
        component={LearningPathsScreen} 
        options={{ title: "Learning Paths" }} 
        />
        <Stack.Screen
          name="LearningPathDetail"
          component={LearningPathDetailScreen}
          options={{ title: "Learning Path Detail" }}
        />
          <Stack.Screen name="Quizzes" component={QuizzesScreen} options={{ title: "Quizzes" }} />
        <Stack.Screen name="QuizDetail" component={QuizDetailScreen} options={{ title: "Quiz Detail" }} />
        <Stack.Screen name="Gamification" component={GamificationScreen} options={{ title: "Gamification" }} />
        <Stack.Screen name="Community" component={CommunityScreen} options={{ title: "Community" }} />
        <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: "Progress" }} />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
