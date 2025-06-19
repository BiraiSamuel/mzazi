import React, { useState, useEffect } from "react";
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
import BabyGrowthCalendar from "../subcomponents/BabyGrowthCalendar";
import DailyInsightCard from "../subcomponents/DailyInsightCard";
import NewsCard from "../subcomponents/NewsCard";
import doctors from "../consts/Doctor";
import pageImages from "../consts/PageImages";
import { db, auth } from "../../firebase";
import moment from "moment";

const { width } = Dimensions.get("screen");
const CARD_WIDTH = width * 0.6;

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [dueDate, setDueDate] = useState(null);
  const [pregnancyWeek, setPregnancyWeek] = useState(null);
  const [weeklyNews, setWeeklyNews] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db.ref("users/" + user.uid).once("value");
        const userData = snapshot.val();

        if (userData?.lmp) {
          const lmpDate = moment(userData.lmp);
          const estimatedDue = lmpDate.clone().add(280, "days");
          setDueDate(estimatedDue.format("YYYY-MM-DD"));

          const weeks = moment().diff(lmpDate, "weeks");
          setPregnancyWeek(weeks);

          setWeeklyNews([
            { id: "1", headline: `Week ${weeks}: Baby milestone update` },
            { id: "2", headline: `Nutrition Tip: Add more iron-rich foods like spinach & beans.` },
            { id: "3", headline: `Emotional Wellness: Take 10 minutes to rest and reflect.` },
            { id: "4", headline: `Development Update: Baby's ${weeks}-week milestone inside.` },
          ]);
        }
      }
    };

    fetchUserDetails();
  }, []);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Headline />

      <ScrollView showsVerticalScrollIndicator={false}>
        <BabyGrowthCalendar
          week={pregnancyWeek}
          size="mango 🥭"
          fact="is developing lungs and fingerprints"
        />

        {pregnancyWeek !== null && (
          <View style={styles.pregnancyInfo}>
            <Text style={styles.sectionTitle}>Pregnancy Tracker</Text>
            <Text style={styles.pregnancyText}>
              You are currently in week {pregnancyWeek} of your pregnancy.
            </Text>
            <Text style={styles.pregnancyText}>Estimated Due Date: {dueDate}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Daily Insights</Text>
        <FlatList
          horizontal
          data={dailyInsights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DailyInsightCard data={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

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

        <CategoryList />

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

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <FlatList
          data={pageImages}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderQuickRoute}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

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
  pregnancyInfo: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pregnancyText: {
    fontSize: 16,
    color: "#2d3436",
    marginTop: 5,
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