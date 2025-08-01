
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getTransactions, resetTransactions } from '../services/transaction.service';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleReset = async () => {
    setResetting(true);
    await resetTransactions();
    setTransactions([]);
    setResetting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử giao dịch demo</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.type} - {item.amount ? `${item.amount} VNĐ` : ''} - {item.status}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Chưa có giao dịch nào.</Text>}
        />
      )}
      <Button title={resetting ? 'Đang reset...' : 'Reset lịch sử'} onPress={handleReset} disabled={resetting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
});

export default TransactionHistoryScreen;
