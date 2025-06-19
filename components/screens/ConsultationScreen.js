import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../firebase";
import Card from "../subcomponents/Card";
import doctors from "../consts/Doctor";
import moment from "moment";

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

  const renderCard = ({ item }) => {
    const [firstName, lastName] = item.doctor.split(" ");
    const doctor = {
      firstname: firstName,
      lastname: lastName || "",
      specialty: item.meeting,
    };

    const isUpcoming = moment(item.date).isSameOrAfter(moment(), 'day');

    return (
      <View style={styles.cardWrapper}>
        <Card doctor={doctor} index={0} />
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge, { backgroundColor: isUpcoming ? '#27ae60' : '#c0392b' }]}> 
            {isUpcoming ? 'Upcoming' : 'Past'}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View Details</Text>
          </TouchableOpacity>
          {isUpcoming && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Join Call</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

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
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  badgeContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  badge: {
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    fontSize: 13,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  actionButton: {
    backgroundColor: "#5DA3FA",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
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