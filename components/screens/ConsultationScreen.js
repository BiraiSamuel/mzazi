import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { auth, db } from "../../firebase";
import { CardTen } from "react-native-card-ui";

function ConsultationScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const uid = auth?.currentUser?.uid;
    if (!uid) return;

    const appointmentRef = db.ref(`appointments/${uid}`);
    appointmentRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setAppointments(data ? Object.values(data) : []);
      setLoading(false);
    });
  };

  const renderCard = ({ item }) => (
    <View style={styles.cardWrapper}>
      <CardTen
        title={item.doctor || "Doctor's Name"}
        subTitle={item.meeting || "Consultation Type"}
        image={{
          uri:
            "https://tudungsicomel.com/wp-content/uploads/2022/08/cara-cuci-uri.png",
        }}
        price={33.5}
        star={3}
        starsFor={item.meeting || "240 reviews"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#5DA3FA" />
      ) : appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No consultations scheduled yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ConsultationScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    color: "#999",
  },
});