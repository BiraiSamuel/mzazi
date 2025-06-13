import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { auth, db } from "../../firebase";
import {
  CardTwo,
  CardTwelve,
  CardEight,
} from "react-native-card-ui";

const screenWidth = Dimensions.get("window").width;

function AppointmentScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const appointmentRef = db.ref("appointments/" + auth.currentUser?.uid);
    appointmentRef.on("value", (snapshot) => {
      const data = snapshot.val();
      // Uncomment below when your Firebase is ready
      // if (data) setAppointments(Object.values(data));
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🧘 Maternal Wellness & Self-Care</Text>

        <CardTwo
          title="Stretch Mark Prevention"
          subTitle="Creams, Oils & Tips"
          profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          image={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          icon="star"
          iconColor="yellow"
        />

        <CardTwo
          title="Maternity Clothing"
          subTitle="Comfortable & Stylish Options"
          profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          image={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          icon="star"
          iconColor="yellow"
        />

        <CardTwo
          title="Skin Care"
          subTitle="Pregnancy-Safe Beauty"
          profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          image={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          icon="star"
          iconColor="grey"
        />

        <Text style={styles.header}>👶 Baby's Growth & Learning</Text>

        <CardTwelve
          image={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
          title="Baby's Growth Diary"
          subTitle="What to expect and do"
          viewProgress
          progress={2}
        />

        <CardEight
          image1={{ uri: "https://tudungsicomel.com/wp-content/uploads/2022/08/cara-cuci-uri.png" }}
          image2={{ uri: "https://tudungsicomel.com/wp-content/uploads/2022/08/cara-cuci-uri.png" }}
          image3={{ uri: "https://tudungsicomel.com/wp-content/uploads/2022/08/cara-cuci-uri.png" }}
        />

        {/* Placeholder for Appointments */}
        {/* Future: List appointments from Firebase */}
        {/* appointments.length > 0 ? appointments.map(... */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AppointmentScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 16,
    textAlign: "center",
    color: "#333",
  },
});