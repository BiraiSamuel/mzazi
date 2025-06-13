import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

const DietScreen = () => {
  const [transcribedText, setTranscribedText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const startSpeechRecognition = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Unsupported', 'Voice recognition is only available on Android.');
      return;
    }

    try {
      const result = await SpeechAndroid.startSpeech(
        'Ask a maternal health question',
        SpeechAndroid.RESULTS_RECOGNITION
      );
      const spokenText = result[0];
      setTranscribedText(spokenText);
      fetchAIResponse(spokenText);
    } catch (error) {
      console.error('Speech recognition error:', error);
      Alert.alert('Error', 'Speech recognition failed. Please try again.');
    }
  };

  const getPlaceholderResponse = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('eat') || lower.includes('food') || lower.includes('diet')) {
      return `You're asking about pregnancy nutrition. This is where machine learning will soon help provide food safety and trimester-based advice.`;
    }
    if (lower.includes('pain') || lower.includes('cramp') || lower.includes('symptom')) {
      return `That sounds like a symptom question. Soon, this assistant will guide you on common discomforts during pregnancy.`;
    }
    if (lower.includes('exercise') || lower.includes('walk')) {
      return `You're asking about physical activity. In the future, ML will give safe movement guidelines based on your stage.`;
    }
    return `This is where machine learning comes in. In future versions, your question will be answered with tailored maternal health advice.`;
  };

  const fetchAIResponse = async (question) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate thinking time
      const placeholder = getPlaceholderResponse(question);
      setResponse(placeholder);
      Tts.speak(placeholder);
    } catch (err) {
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🤱 Maternal Health Voice Assistant</Text>
      <TouchableOpacity style={styles.micButton} onPress={startSpeechRecognition}>
        <Text style={styles.micButtonText}>🎙️ Tap to Speak</Text>
      </TouchableOpacity>

      {transcribedText ? (
        <Text style={styles.userText}>🗣️ You asked: "{transcribedText}"</Text>
      ) : (
        <Text style={styles.prompt}>Ask a question like “Can I eat mango while pregnant?”</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#5DA3FA" style={{ marginTop: 30 }} />
      ) : response ? (
        <ScrollView style={styles.responseBox}>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  micButton: {
    backgroundColor: '#5DA3FA',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  micButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  prompt: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  userText: {
    fontSize: 17,
    marginTop: 20,
    color: '#333',
    fontStyle: 'italic',
  },
  responseBox: {
    marginTop: 30,
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 10,
    maxHeight: 250,
  },
  responseText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default DietScreen;