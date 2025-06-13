import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BabyGrowthCalendar = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Week 24</Text>
    <Text style={styles.subtitle}>Your baby is the size of a corn cob 🌽</Text>
    <Text style={styles.description}>
      At this stage, your baby can hear sounds and respond to your voice.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff7e6",
    padding: 20,
    borderRadius: 15,
    margin: 20,
    shadowColor: "#f39c12",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e67e22",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 18,
    color: "#d35400",
    fontWeight: "600",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
  },
});

export default BabyGrowthCalendar;