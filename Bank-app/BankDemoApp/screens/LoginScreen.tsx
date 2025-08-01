
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { login } from '../services/auth.service';

const LoginScreen = ({ onLogin }: { onLogin: (code: string) => void }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(code);
      setResult(res.success ? `Xin chào, ${res.name}` : 'Mã không hợp lệ');
      if (res.success) onLogin(code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập demo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã nhân viên/đối tác"
        value={code}
        onChangeText={setCode}
      />
      <Button title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'} onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {result && <Text style={{ marginTop: 16 }}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, width: '80%', marginBottom: 16 },
});

export default LoginScreen;
