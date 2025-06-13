import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../../firebase";

export default function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.navigate("LoginScreen"))
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
          <Text style={styles.profileName}>
            {auth.currentUser?.email || "Anonymous"}
          </Text>
          <Text style={styles.profileSubtitle}>Pregnancy Stage: 2nd Trimester</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>📋 Personal Info</Text>
          {renderInfoRow("Email", auth.currentUser?.email)}
          {renderInfoRow("Age Group", "20-30 years")}
          {renderInfoRow("Gender", "Female")}
          {renderInfoRow("Joined", "March 4, 2023")}
          {renderInfoRow("Location", "Alger, Canada")}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>⭐ Reviews</Text>
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Text key={i} style={styles.star}>
                {i < 3 ? "★" : "☆"}
              </Text>
            ))}
            <Text style={styles.reviewText}> (240 reviews)</Text>
          </View>
        </View>

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
  },
  infoLabel: {
    fontSize: 16,
    color: "#95A5A6",
  },
  infoValue: {
    fontSize: 16,
    color: "#2C3E50",
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
  logoutButtonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonContainer: {
    width: "60%",
    alignSelf: "center",
  },
});