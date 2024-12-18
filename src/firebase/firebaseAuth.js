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
    {
      title: "Web Development",
      description: "Build modern websites using HTML, CSS, and JavaScript.",
      content: "This course includes hands-on projects for beginners.",
      duration: "6 hours",
      difficulty: "Beginner",
    },
    {
      title: "Data Science",
      description: "Learn data analysis and visualization techniques.",
      content: "Covers Python, Pandas, and machine learning basics.",
      duration: "10 hours",
      difficulty: "Advanced",
    },
    {
      title: "Digital Marketing",
      description: "Master the art of online marketing and SEO.",
      content: "Covers social media strategies and Google Ads.",
      duration: "7 hours",
      difficulty: "Intermediate",
    },
    {
      title: "Cybersecurity Basics",
      description: "Learn how to protect systems and data from threats.",
      content: "Covers ethical hacking, firewalls, and encryption basics.",
      duration: "6 hours",
      difficulty: "Beginner",
    },
    {
      title: "AI and Machine Learning",
      description: "Dive into the world of AI and build intelligent systems.",
      content: "Covers neural networks, TensorFlow, and deep learning basics.",
      duration: "12 hours",
      difficulty: "Advanced",
    },
    {
      title: "Creative Writing",
      description: "Enhance your storytelling and writing skills.",
      content: "Covers techniques for fiction, non-fiction, and poetry.",
      duration: "3 hours",
      difficulty: "Beginner",
    },
    {
      title: "Photography Basics",
      description: "Learn to take stunning photos with professional techniques.",
      content: "Covers camera settings, composition, and editing.",
      duration: "4 hours",
      difficulty: "Intermediate",
    },
  ];
  
  // Function to populate the `courses` and `coursedetail` collections
  export const populateFirestore = async () => {
    try {
      // References to the collections
      const courseCollectionRef = collection(db, "courses");
      const courseDetailCollectionRef = collection(db, "coursedetail");
  
      // Loop through each course detail and add it to the database
      for (const courseDetail of courseDetails) {
        // Add course detail to `coursedetail` collection
        const courseDetailDocRef = await addDoc(courseDetailCollectionRef, courseDetail);
        console.log(`Course Detail added with ID: ${courseDetailDocRef.id}`);
  
        // Add corresponding course to `courses` collection with a reference to the course detail
        await addDoc(courseCollectionRef, {
          title: courseDetail.title,
          description: courseDetail.description,
          courseDetailRef: courseDetailDocRef, // Reference to the corresponding course detail
        });
  
        console.log(`Course added with reference to detail ID: ${courseDetailDocRef.id}`);
      }
  
      console.log("Courses and Course Details populated successfully!");
    } catch (error) {
      console.error("Error populating Firestore: ", error);
    }
  };
  
  // Call the function to populate the Firestore database
