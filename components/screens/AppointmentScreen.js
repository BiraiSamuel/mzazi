import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Linking,
  ToastAndroid,
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

  const openURL = async (url) => {
    try {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Opening article...", ToastAndroid.SHORT);
      }
      await Linking.openURL(url);
    } catch (err) {
      alert("Could not open the article.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🧘 Maternal Wellness & Self-Care</Text>

        <TouchableOpacity onPress={() => openURL("https://americanpregnancy.org/healthy-pregnancy/pregnancy-concerns/prevent-pregnancy-stretchmarks/")}>
          <CardTwo
            title="Stretch Mark Prevention"
            subTitle="Creams, Oils & Tips"
            profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
            image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FHCDsdzryZ_A%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=5e44200af072f07075a1ad7e7e352f3d4a76e0dc5c2872ba7d70df2ca90a713a" }}
            icon="star"
            iconColor="yellow"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openURL("https://www.forbes.com/sites/forbes-personal-shopper/article/best-maternity-brands/")}>
          <CardTwo
            title="Maternity Clothing"
            subTitle="Comfortable & Stylish Options"
            profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
            image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhalaraapp.com%2Fwp-content%2Fuploads%2F2024%2F12%2FPregnancy-with-Comfortable-Stylish-Maternity-Clothing-1024x585.jpg&f=1&nofb=1&ipt=8b202a45c8f4328702228df2d53f9f76c100af8aefa3c7595ad38daece642294" }}
            icon="star"
            iconColor="yellow"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openURL("https://www.vogue.com/article/pregnancy-safe-skin-care")}>        
          <CardTwo
            title="Skin Care"
            subTitle="Pregnancy-Safe Beauty"
            profile={{ uri: "https://www.amritapuri.org/photos/05-babies/baby300.jpg" }}
            image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jeffersonhealth.org%2Fcontent%2Fdam%2Fhealth2021%2Fimages%2Fphotos%2Fstock%2Fpeople%2Fnon-clinical%2Fskin-care-guide.jpg&f=1&nofb=1&ipt=b3c544b8d3e496e31ae4e404e3e5f918d26fb36f5860cd16df95e7230146e51a" }}
            icon="star"
            iconColor="grey"
          />
        </TouchableOpacity>

        <Text style={styles.header}>👶 Baby's Growth & Learning</Text>

        <TouchableOpacity onPress={() => openURL("https://www.babycenter.com/pregnancy/week-by-week/24-weeks-pregnant_1123")}>        
          <CardTwelve
            image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnewpic.wetvinfo.com%2Fvpic_cover%2Fv0838virfa7%2Fv0838virfa7_hz.jpg%2F640&f=1&nofb=1&ipt=f9624907298728c47940ae065993ab058cd355b0cedf1766d4d03bf88dd62998" }}
            title="Baby's Growth Diary"
            subTitle="What to expect and do"
            viewProgress
            progress={2}
          />
        </TouchableOpacity>
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