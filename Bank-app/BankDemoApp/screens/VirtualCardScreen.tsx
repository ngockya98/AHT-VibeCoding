import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { createVirtualCard } from '../services/virtualcard.service';

const VirtualCardScreen = () => {
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Gọi service thay vì mock trực tiếp
  const handleRegister = async () => {
    if (name && otp === '123456') {
      setLoading(true);
      try {
        const cardData = await createVirtualCard(name);
        setCard(cardData);
      } catch (e) {
        setCard(null);
      } finally {
        setLoading(false);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Vui lòng nhập tên và OTP (123456)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phát hành thẻ Visa ảo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên chủ thẻ"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập OTP (mock: 123456)"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button title={loading ? 'Đang xử lý...' : 'Đăng ký thẻ'} onPress={handleRegister} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {card && (
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{card.number}</Text>
          <Text>HSD: {card.expiry}</Text>
          <Text>Tên: {card.name}</Text>
          <Text>CVV: {card.cvv}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, width: '80%', marginBottom: 16 },
  card: { marginTop: 24, padding: 16, borderRadius: 12, backgroundColor: '#1e3799', width: 260 },
  cardNumber: { color: '#fff', fontSize: 20, letterSpacing: 2, marginBottom: 8 },
});

export default VirtualCardScreen;
