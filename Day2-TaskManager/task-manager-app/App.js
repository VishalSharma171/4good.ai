import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';

// Dummy profile picture
const dummyProfilePic = "https://randomuser.me/api/portraits/men/11.jpg";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!username || !email) {
        Alert.alert("Error", "Please enter both username and email.");
        return;
      }
      setStep(2);
    } else {
      if (!password) {
        Alert.alert("Error", "Please enter the password.");
        return;
      }
      setIsLoggedIn(true);
      setModalVisible(true);  // Show the welcome popup
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <BottomNav username={username} email={email} />
      ) : (
        <ScrollView contentContainerStyle={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>

          {step === 1 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </>
          )}
          {step === 2 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </>
          )}

          <Button title={step === 1 ? "Next" : "Submit"} onPress={handleNext} />

          {/* Modal for Welcome Message */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.welcomeMessage}>Welcome, {username}!</Text>
                <Button title="Close" onPress={closeModal} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
}

// Bottom Navigation Bar Component
const BottomNav = ({ username, email }) => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setSelectedTab("Chatbot")}>
          <Text style={styles.navText}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setSelectedTab("Patients")}>
          <Text style={styles.navText}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setSelectedTab("Profile")}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screenContainer}>
        {selectedTab === "Profile" && (
          <ProfileScreen username={username} email={email} />
        )}
        {selectedTab === "Chatbot" && <Text style={styles.tabText}>Chatbot is coming soon!</Text>}
        {selectedTab === "Patients" && <Text style={styles.tabText}>Patients' List is coming soon!</Text>}
      </View>
    </View>
  );
};

// Profile Screen Component
const ProfileScreen = ({ username, email }) => {
  return (
    <View style={styles.profileContainer}>
      <Image style={styles.profilePic} source={{ uri: dummyProfilePic }} />
      <Text style={styles.profileText}>Username: {username}</Text>
      <Text style={styles.profileText}>Email: {email}</Text>
    </View>
  );
};

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#87CEEB', // Light sky blue background
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'sans-serif-medium',
  },
  input: {
    width: '80%',
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#00000070', // Semi-transparent black background for inputs
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  navContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#f8f8f8', // Light background for bottom nav
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tabText: {
    fontSize: 18,
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
});
