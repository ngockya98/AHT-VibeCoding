// Mock API for demo modules

// NFC Payment
export const mockNfcPayment = (amount: number) => {
  return new Promise<{ success: boolean; amount: number; message: string }>((resolve) =>
    setTimeout(() => resolve({ success: true, amount, message: 'Giao dịch thành công!' }), 1000)
  );
};

// Online Savings
export const mockOnlineSavings = (amount: number, term: number) => {
  const interestRates: Record<number, number> = { 1: 3.5, 3: 4.0, 6: 5.0, 12: 6.0 };
  return new Promise<{ success: boolean; soto: string; interest: number }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          success: true,
          soto: `Sổ tiết kiệm #${Math.floor(Math.random() * 100000)}`,
          interest: interestRates[term] || 0,
        }),
      1200
    )
  );
};

// eKYC
export const mockEkyc = () => {
  return new Promise<{ ocr: boolean; faceMatch: boolean; liveness: boolean; message: string }>((resolve) =>
    setTimeout(() => resolve({ ocr: true, faceMatch: true, liveness: true, message: 'KYC thành công!' }), 1500)
  );
};

// Virtual Card
export const mockVirtualCard = (name: string) => {
  return new Promise<{ number: string; expiry: string; name: string; cvv: string }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          number: '4111 1111 1111 1111',
          expiry: '12/30',
          name,
          cvv: '123',
        }),
      1200
    )
  );
};

// Transaction History
export const mockGetTransactions = () => {
  return new Promise<Array<{ id: string; type: string; amount: number; status: string }>>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: '1', type: 'NFC', amount: 1000000, status: 'success' },
          { id: '2', type: 'Savings', amount: 5000000, status: 'success' },
          { id: '3', type: 'Card', amount: 0, status: 'created' },
        ]),
      800
    )
  );
};

export const mockResetTransactions = () => {
  return new Promise<{ success: boolean }>((resolve) => setTimeout(() => resolve({ success: true }), 500));
};

// Simple Login
export const mockLogin = (code: string) => {
  return new Promise<{ success: boolean; role: string; name: string }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          success: !!code,
          role: code.startsWith('admin') ? 'admin' : 'user',
          name: code ? `Demo User ${code}` : '',
        }),
      700
    )
  );
};
