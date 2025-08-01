
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { ekyc } from '../services/ekyc.service';

const EkycScreen = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEkyc = async () => {
    setLoading(true);
    try {
      const res = await ekyc();
      setResult(res.message);
    } catch {
      setResult('Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC điện tử (eKYC)</Text>
      <Button title={loading ? 'Đang xử lý...' : 'Thực hiện eKYC'} onPress={handleEkyc} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  result: { marginTop: 20, fontSize: 18, color: '#38ada9' },
});

export default EkycScreen;
