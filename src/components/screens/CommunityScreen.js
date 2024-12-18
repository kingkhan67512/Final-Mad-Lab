// CommunityScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { db } from "../../firebase/firebaseConfig"; // Make sure this path is correct for your Firebase config
import { collection, getDocs, addDoc } from "firebase/firestore";

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "communityPosts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when screen loads
  }, []);

  // Add a new post
  const handleAddPost = async () => {
    if (!newPost.trim()) return; // Do not add empty posts
    try {
      await addDoc(collection(db, "communityPosts"), {
        content: newPost,
        timestamp: new Date(),
      });
      setNewPost(""); // Clear input field
      fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  // Render posts in the community feed
  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postTimestamp}>
        {new Date(item.timestamp.seconds * 1000).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>

      {/* Input for creating a new post */}
      <View style={styles.newPostContainer}>
        <TextInput
          style={styles.textInput}
          value={newPost}
          onChangeText={setNewPost}
          placeholder="What's on your mind?"
          multiline
        />
        <TouchableOpacity onPress={handleAddPost} style={styles.addPostButton}>
          <Text style={styles.addPostButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Posts list */}
      <ScrollView contentContainerStyle={styles.postsContainer}>
        {loading ? (
          <Text>Loading posts...</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
          />
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  newPostContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
  },
  addPostButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postsContainer: {
    flexGrow: 1,
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  postTimestamp: {
    fontSize: 12,
    color: "#888",
  },
});

export default CommunityScreen;
