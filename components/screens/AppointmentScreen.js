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

function AppointmentScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const appointmentRef = db.ref("appointments/" + auth.currentUser?.uid);
    appointmentRef.on("value", (snapshot) => {
      const data = snapshot.val();
      // setAppointments(Object.values(data));
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <CardTwo
            title={"Stretch Mark prevention"}
            subTitle={"Creams Oils & Tips"}
            profile={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            image={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            icon={"star"}
            iconColor={"yellow"}
          />
          <CardTwo
            title={"Maternity Clothing"}
            subTitle={"Comfortable & Stylish options"}
            profile={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            image={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            icon={"star"}
            iconColor={"yellow"}
          />
          <CardTwo
            title={"Skin care"}
            subTitle={"Pregnancy Safe Beauty"}
            profile={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            image={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            icon={"star"}
            iconColor={"grey"}
          />
          <CardTwelve
            image={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.amritapuri.org%2Fphotos%2F05-babies%2Fbaby300.jpg&f=1&nofb=1&ipt=6269e5871666a2ab19c58772d79fb1c30491aa441e253bc9434b014cd28e47bc&ipo=images"
            }}
            title={"Baby's Growth Diary"}
            subTitle={"What to expect and do"}
            viewProgress={true}
            progress={2}
          />                  
                            <CardEight
                              image1={{
                                uri:
                                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudungsicomel.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fcara-cuci-uri.png&f=1&nofb=1&ipt=2752f67e1eccd79caa4c7ef1824a810c2653240b56838805abc5d98716f5f74f&ipo=images"
                              }}
                              image2={{
                                uri:
                                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudungsicomel.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fcara-cuci-uri.png&f=1&nofb=1&ipt=2752f67e1eccd79caa4c7ef1824a810c2653240b56838805abc5d98716f5f74f&ipo=images"
                              }}
                              image3={{
                                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudungsicomel.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fcara-cuci-uri.png&f=1&nofb=1&ipt=2752f67e1eccd79caa4c7ef1824a810c2653240b56838805abc5d98716f5f74f&ipo=images"
                              }}
                            />
        </ScrollView>
        {/*this.state.people.map((item, i) => <Text key={i}>{item.name} </Text>)*/}
      </SafeAreaView>
    </View>
  );
}

export default AppointmentScreen;

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
