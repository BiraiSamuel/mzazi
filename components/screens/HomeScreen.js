import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Headline from "../subcomponents/Headline";
import CategoryList from "../subcomponents/CategoryList";
import Card from "../subcomponents/Card";
import QuickRoute from "../subcomponents/QuickRoute";
import BabyGrowthCalendar from "../subcomponents/BabyGrowthCalendar"; // 🍼 NEW
import DailyInsightCard from "../subcomponents/DailyInsightCard";     // 🌞 NEW
import NewsCard from "../subcomponents/NewsCard";                     // 📰 NEW
import doctors from "../consts/Doctor";
import pageImages from "../consts/PageImages";

const { width } = Dimensions.get("screen");
const CARD_WIDTH = width * 0.6;

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      `${doctor.firstname} ${doctor.lastname}`
        .toUpperCase()
        .includes(text.toUpperCase())
    );

    setFilteredDoctors(filtered);
  };

  const renderDoctorCard = ({ item, index }) => (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Booking", item)}
    >
      <Card doctor={item} index={index} />
    </TouchableOpacity>
  );

  const renderQuickRoute = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(item)}
      style={{ marginRight: 16 }}
    >
      <QuickRoute page={item} />
    </TouchableOpacity>
  );

  const dailyInsights = [
    { id: "1", title: "Hydration Tips", text: "Drink at least 8 glasses today." },
    { id: "2", title: "Mood Tracker", text: "Record how you feel." },
    { id: "3", title: "Kick Counter", text: "Monitor baby's movements today." },
  ];

  const weeklyNews = [
    { id: "1", headline: "Week 24: Your Baby Can Hear Sounds!" },
    { id: "2", headline: "Gestational Diabetes Explained" },
    { id: "3", headline: "Nesting Instinct: What It Means" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Headline />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🍼 Baby Growth Calendar */}
        <BabyGrowthCalendar />

        {/* 🧠 Daily Insights */}
        <Text style={styles.sectionTitle}>Daily Insights</Text>
        <FlatList
          horizontal
          data={dailyInsights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DailyInsightCard data={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* 🔎 Search */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find your Mzazi doctor here</Text>
        </View>

        <SearchBar
          round
          placeholder="Search doctors by name"
          onChangeText={handleSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
          inputStyle={{ fontSize: 16 }}
          lightTheme
        />

        {/* 📂 Categories */}
        <CategoryList />

        {/* 👩‍⚕️ Doctor Cards */}
        <Text style={styles.sectionTitle}>Doctors</Text>
        {filteredDoctors.length > 0 ? (
          <FlatList
            data={filteredDoctors}
            horizontal
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={renderDoctorCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No doctors found for “{search}”</Text>
          </View>
        )}

        {/* ⚡ Quick Navigation */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <FlatList
          data={pageImages}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderQuickRoute}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* 📰 Weekly Round-Up */}
        <Text style={styles.sectionTitle}>This Week’s Round-Up</Text>
        {weeklyNews.map((item) => (
          <NewsCard key={item.id} headline={item.headline} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3436",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    height: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#34495e",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  horizontalList: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#b2bec3",
    fontSize: 16,
    fontStyle: "italic",
  },
});