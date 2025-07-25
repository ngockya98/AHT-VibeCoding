// Mock API calls
export const fetchUser = () => Promise.resolve({ name: 'Nguyen Van A', balance: 12000000, currency: 'VND' });
export const fetchTransactions = () => Promise.resolve([
  { id: 1, title: 'Chuyển tiền', amount: '-500,000', date: '2025-07-20', icon: '💸' },
  { id: 2, title: 'Nhận lương', amount: '+15,000,000', date: '2025-07-15', icon: '💰' },
]);
// ...other mock APIs
