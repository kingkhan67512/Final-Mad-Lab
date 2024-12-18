// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase/firebaseConfig'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch users data from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Reference to Firestore collection "users"
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
    } catch (error) {
      console.error('Error getting documents:', error);
      Alert.alert('Error', 'Failed to fetch data from Firebase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {users.length > 0 ? (
            users.map((user, index) => (
              <Text key={index} style={styles.userText}>
                {JSON.stringify(user)}
              </Text>
            ))
          ) : (
            <Text>No users found.</Text>
          )}
        </View>
      )}
      <Button title="Reload Data" onPress={fetchUsers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  userText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default UsersList;
