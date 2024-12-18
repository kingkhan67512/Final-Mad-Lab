import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { db } from './firebaseConfig';
import { setDoc,addDoc,collection, doc, serverTimestamp} from 'firebase/firestore'; // Import the serverTimestamp function

export const registerUser = async (email, password, userName) => {
    try {
      // Step 1: Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };
 
 
  export const addSampleCourses = async () => {
    const courses = [
      {
        title: 'Introduction to Programming',
        description: 'Learn the basics of programming with hands-on examples.',
      },
      {
        title: 'Advanced Math',
        description: 'Deep dive into advanced mathematical concepts and techniques.',
      },
      {
        title: 'Language Learning',
        description: 'Pick up a new language with interactive exercises.',
      },
      {
        title: 'Web Development Basics',
        description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
      },
      {
        title: 'Machine Learning 101',
        description: 'An introduction to the basics of machine learning and AI.',
      },
    ];
  
    try {
      // Loop through each course and add it to the Firestore collection
      for (const course of courses) {
        await addDoc(collection(db, 'courses'), course);
      }
      console.log('Sample courses added successfully');
    } catch (err) {
      console.error('Error adding sample courses: ', err);
    }
  };

  const addCourseDetail = async (course) => {
    const db = getFirestore();
    try {
      // Add the course details to the 'CourseDetail' collection
      const docRef = await addDoc(collection(db, "CourseDetail"), course);
      console.log("Course added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding course: ", e);
    }
  };
  
  // Sample course data (based on existing courses data)
  const courseDetails = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with hands-on examples.",
      content: "This course covers variables, loops, and basic algorithms.",
      duration: "4 hours",
      difficulty: "Beginner",
    },
    {
      title: "Advanced Math",
      description: "Deep dive into advanced mathematical concepts and techniques.",
      content: "This course covers calculus, algebra, and geometry.",
      duration: "8 hours",
      difficulty: "Advanced",
    },
    {
      title: "Language Learning",
      description: "Pick up a new language with interactive exercises.",
      content: "This course covers vocabulary, grammar, and conversation practice.",
      duration: "5 hours",
      difficulty: "Intermediate",
    },
  ];
  
  // Call the function to add course details
  const populateCourseDetails = async () => {
    for (const course of courseDetails) {
      await addCourseDetail(course);
    }
  };
  
  populateCourseDetails();  // Call this function to populate data in Firestore
  