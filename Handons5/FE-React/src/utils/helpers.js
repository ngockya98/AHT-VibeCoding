// Utility functions
export const formatCurrency = (amount, currency = 'VND') => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency });
};
