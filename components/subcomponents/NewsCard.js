import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewsCard = ({ headline }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.headline}>{headline}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f2f6",
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#57606f",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2f3542",
  },
});

export default NewsCard;