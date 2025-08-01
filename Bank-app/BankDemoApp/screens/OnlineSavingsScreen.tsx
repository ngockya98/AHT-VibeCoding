
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { onlineSavings } from '../services/savings.service';

const terms = [1, 3, 6, 12];

const OnlineSavingsScreen = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState(1);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (amount && parseFloat(amount) > 0) {
      setLoading(true);
      try {
        const res = await onlineSavings(Number(amount), term);
        setResult(`Gửi ${amount} triệu, kỳ hạn ${term} tháng, lãi suất ${res.interest}%/năm\n${res.soto}`);
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
      <Text style={styles.title}>Gửi tiền tiết kiệm online</Text>
      <TextInput
        style={styles.input}
        placeholder="Số tiền gửi (triệu VNĐ)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.termRow}>
        {terms.map((t) => (
          <Button
            key={t}
            title={`${t} tháng`}
            onPress={() => setTerm(t)}
            color={term === t ? '#1e3799' : '#aaa'}
          />
        ))}
      </View>
      <Button title={loading ? 'Đang xử lý...' : 'Xác nhận gửi tiền'} onPress={handleDeposit} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, width: '80%', marginBottom: 16 },
  termRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  result: { marginTop: 20, fontSize: 18, color: '#38ada9' },
});

export default OnlineSavingsScreen;
