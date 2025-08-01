
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { nfcPayment } from '../services/nfc.service';

const NFCPaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTap = async () => {
    if (amount && parseFloat(amount) > 0) {
      setLoading(true);
      try {
        const res = await nfcPayment(Number(amount));
        setResult(res.message);
      } catch {
        setResult('Có lỗi xảy ra.');
      } finally {
        setLoading(false);
      }
    } else {
      setResult('Vui lòng nhập số tiền hợp lệ.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán không chạm (NFC)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số tiền giao dịch"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title={loading ? 'Đang xử lý...' : 'Tap để thanh toán'} onPress={handleTap} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, width: '80%', marginBottom: 16 },
  result: { marginTop: 20, fontSize: 18, color: '#38ada9' },
});

export default NFCPaymentScreen;
