import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import AppointmentScreen from "../screens/AppointmentScreen";
import BookingScreen from "../screens/BookingScreen";
import DietScreen from "../screens/DietScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConsultationScreen from "../screens/ConsultationScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: "Book Appointment",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home-outline";
          } else if (route.name === "Resources") {
            iconName = "md-document-text-outline";
          } else if (route.name === "Consult") {
            iconName = "md-ear-outline";
          } else if (route.name === "Appointments") {
            iconName = "md-people-circle-outline";
          } else if (route.name === "Profile") {
            iconName = "md-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#216afc",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Resources"
        component={AppointmentScreen}
        options={{
          headerShown: true,
          headerTitle: "Resources and Articles",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen name="Consult" component={DietScreen} />
      <Tab.Screen name="Appointments" component={ConsultationScreen} 
      options={{
        headerShown: true,
        headerTitle: "Consultations",
        headerTitleAlign: "center",
      }}/>
      <Tab.Screen
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Personal Infomation",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
