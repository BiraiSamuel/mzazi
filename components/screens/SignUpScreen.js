import { Text, StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { auth, db } from "../../firebase";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [lmp, setLMP] = useState(""); // Last Menstrual Period
  const [status, setStatus] = useState(""); // Pregnant or Postpartum

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered new user:", user.email);

        db.ref("users/" + user.uid).set({
          fullName,
          phone,
          email,
          lmp,
          status,
          createdAt: new Date().toISOString(),
        });

        navigation.navigate("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Register your account!</Text>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName} />
        <TextInput placeholder="Phone Number" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput placeholder="LMP (YYYY-MM-DD)" style={styles.input} value={lmp} onChangeText={setLMP} />
        <TextInput placeholder="Status (Pregnant/Postpartum)" style={styles.input} value={status} onChangeText={setStatus} />

        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={[styles.button, styles.buttonOutline]}
          onPress={handleSignUp}
          title="Register"
          titleStyle={styles.buttonOutlineText}
        />

        <View style={styles.textContainer}>
          <Text>Already have an account?</Text>
          <Button type="clear" title="Log In" titleStyle={styles.text} onPress={() => navigation.navigate("LoginScreen")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "green",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
  },
});

export default SignUpScreen;
