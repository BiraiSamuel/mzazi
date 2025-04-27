import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SpeechAndroid from 'react-native-android-voice';

const DietScreen = () => {
  const [transcribedText, setTranscribedText] = useState('');

  const startSpeechRecognition = () => {
    SpeechAndroid.startSpeech('Please say something', SpeechAndroid.RESULTS_RECOGNITION)
      .then((result) => {
        console.log('Speech recognition result: ', result);
        setTranscribedText(result[0]);
      })
      .catch((error) => {
        console.log('Speech recognition error: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Consultation Speech to Text</Text>
      <Button title="Start Recording" onPress={startSpeechRecognition} />
      {transcribedText ? (
        <Text style={styles.transcribedText}>
          {`You said: ${transcribedText}`}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  transcribedText: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default DietScreen;
