import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LandingScreen = () => (
  <View style={styles.container}>
    <Image source={require('../assets/bank_logo.png')} style={styles.logo} />
    <Text style={styles.title}>Bank Demo App</Text>
    <Text style={styles.subtitle}>Giới thiệu các giải pháp công nghệ thanh toán mới</Text>
    {/* TODO: Add animation/video showcase */}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f6fa' },
  logo: { width: 120, height: 120, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1e3799' },
  subtitle: { fontSize: 16, color: '#4a69bd', marginTop: 8, textAlign: 'center', paddingHorizontal: 24 },
});

export default LandingScreen;
