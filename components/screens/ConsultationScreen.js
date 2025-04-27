import React, { useEffect, useState } from "react";
import { StyleSheet, View,Platform,Text,SafeAreaView,ScrollView,Dimensions, FlatList } from "react-native";
import { auth, db } from "../../firebase";
import {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
  CardSix,
  CardSeven,
  CardEight,
  CardNine,
  CardTen,
  CardEleven,
  CardTwelve,
  CardEcomOne,
  CardEcomTwo,
  CardEcomThree,
  CardEcomFour
} from "react-native-card-ui";

function ConsultationScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const appointmentRef = db.ref("appointments/" + auth.currentUser?.uid);
    appointmentRef.on("value", (snapshot) => {
      const data = snapshot.val();
      data ? setAppointments(Object.values(data)): [];
    });
  };

  return (
    <View style={styles.container}>
    {appointments != [] ? 
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardTen
          title={item.doctor}
          subTitle={item.meeting}
          image={{
            uri:
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudungsicomel.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fcara-cuci-uri.png&f=1&nofb=1&ipt=2752f67e1eccd79caa4c7ef1824a810c2653240b56838805abc5d98716f5f74f&ipo=images"
          }}
          price={33.5}
          star={3}
          starsFor={item.meeting}
        />
        )}
      />
      :
      <CardTen
            title={"Doctor's Appointment"}
            subTitle={"Meeting Type"}
            image={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudungsicomel.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fcara-cuci-uri.png&f=1&nofb=1&ipt=2752f67e1eccd79caa4c7ef1824a810c2653240b56838805abc5d98716f5f74f&ipo=images"
            }}
            price={33.5}
            star={3}
            starsFor={"240 reviews"}
    />
    }
    </View>
  );
}

export default ConsultationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    marginVertical: 30,
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 12,
    width: Dimensions.get("window").width * 0.8,
  },
  headerContainer: {
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingRight: 20,
  },
});