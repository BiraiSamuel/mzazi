import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DailyInsightCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.text}>{data.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#dff9fb",
    width: width * 0.6,
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#00a8ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0097e6",
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: "#40739e",
    lineHeight: 20,
  },
});

export default DailyInsightCard;