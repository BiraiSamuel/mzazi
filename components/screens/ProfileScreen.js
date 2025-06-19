import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { auth, db } from "../../firebase";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db.ref("users/" + user.uid).once("value");
        const data = snapshot.val();
        setUserData(data || {});
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.navigate("LoginScreen"))
      .catch((err) => alert(err.message));
  };

  const handleUpdate = () => {
    const uid = auth?.currentUser?.uid;
    if (!uid) return;

    db.ref("users/" + uid)
      .update(userData)
      .then(() => {
        setEditing(false);
        Alert.alert("Success", "Your profile has been updated successfully.");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>👩‍🍼 Mother's Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData.fullName || "Anonymous"}</Text>
          <Text style={styles.profileSubtitle}>Pregnancy Status: {userData.status || "N/A"}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>📋 Personal Info</Text>
          {renderEditableRow("Full Name", "fullName", userData, setUserData, editing)}
          {renderEditableRow("Phone", "phone", userData, setUserData, editing)}
          {renderEditableRow("Pregnancy Status", "status", userData, setUserData, editing)}
          {renderEditableRow("Last Menstrual Period (LMP)", "lmp", userData, setUserData, editing)}
          {renderInfoRow("Email", auth.currentUser?.email)}
          {renderInfoRow("Account Created", userData.createdAt)}
        </View>

        {editing ? (
          <Button
            title="Save Changes"
            onPress={handleUpdate}
            buttonStyle={styles.editButton}
            titleStyle={styles.logoutButtonTitle}
            containerStyle={styles.logoutButtonContainer}
          />
        ) : (
          <Button
            title="Edit Profile"
            onPress={() => setEditing(true)}
            buttonStyle={styles.editButton}
            titleStyle={styles.logoutButtonTitle}
            containerStyle={styles.logoutButtonContainer}
          />
        )}

        <Button
          title="Log Out"
          onPress={handleSignOut}
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutButtonTitle}
          containerStyle={styles.logoutButtonContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function renderInfoRow(label, value) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  );
}

function renderEditableRow(label, key, userData, setUserData, editing) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      {editing ? (
        <TextInput
          style={styles.editInput}
          value={userData[key] || ""}
          onChangeText={(text) => setUserData({ ...userData, [key]: text })}
        />
      ) : (
        <Text style={styles.infoValue}>{userData[key] || "—"}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495E",
  },
  profileSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2C3E50",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    color: "#95A5A6",
    width: "50%",
  },
  infoValue: {
    fontSize: 16,
    color: "#2C3E50",
    width: "50%",
    textAlign: "right",
  },
  editInput: {
    fontSize: 16,
    color: "#2C3E50",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "50%",
    textAlign: "right",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 20,
    color: "#FFD700",
    marginRight: 2,
  },
  reviewText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: "#5DA3FA",
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButtonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonContainer: {
    width: "60%",
    alignSelf: "center",
  },
});