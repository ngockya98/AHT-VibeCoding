import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

import styles from './Payment.module.css';

const Payment = () => {
  const [paymentMode, setPaymentMode] = useState('qr'); // 'qr' or 'nfc'
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [amount, setAmount] = useState('');
  const [merchantName, setMerchantName] = useState('');

  const handleScanOrTap = () => {
    // Simulate scan/tap success
    setTimeout(() => {
      setMerchantName('Coffee Shop ABC'); // Mock data
      setAmount('50.000'); // Mock data
      setTransactionConfirmed(true);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    alert(`Thanh toán ${amount} VND cho ${merchantName} thành công!`);
    // Reset state for next payment
    setTransactionConfirmed(false);
    setAmount('');
    setMerchantName('');
  };

  return (
    <div className={styles.paymentContainer}>
      <Header title="Thanh toán" showBackButton={true} />

      <main className={styles.mainContent}>
        <div className={styles.toggleButtons}>
          <Button
            variant={paymentMode === 'qr' ? 'primary' : 'secondary'}
            onClick={() => setPaymentMode('qr')}
          >
            Quét QR
          </Button>
          <Button
            variant={paymentMode === 'nfc' ? 'primary' : 'secondary'}
            onClick={() => setPaymentMode('nfc')}
          >
            Chạm NFC
          </Button>
        </div>

        {!transactionConfirmed ? (
          <div className={styles.paymentInitiation}>
            {paymentMode === 'qr' ? (
              <>
                <div className={styles.qrScannerFrame}>
                  {/* Placeholder for QR camera feed */}
                  <img src="/src/assets/images/qr-placeholder.png" alt="QR Scanner" className={styles.qrPlaceholder} />
                  <p>Căn chỉnh mã QR vào khung để quét.</p>
                </div>
                <Button onClick={handleScanOrTap}>Mô phỏng quét QR</Button>
              </>
            ) : (
              <>
                <div className={styles.nfcAnimation}>
                  {/* Placeholder for NFC animation */}
                  <img src="/src/assets/images/nfc-animation.gif" alt="NFC Tap" className={styles.nfcPlaceholder} />
                  <p>Chạm điện thoại vào thiết bị thanh toán.</p>
                </div>
                <Button onClick={handleScanOrTap}>Mô phỏng chạm NFC</Button>
              </>
            )}
          </div>
        ) : (
          <div className={styles.confirmationModal}>
            <h3 className={styles.modalTitle}>Xác nhận giao dịch</h3>
            <p className={styles.modalText}>Bạn muốn thanh toán cho:</p>
            <p className={styles.modalMerchant}>{merchantName}</p>
            <p className={styles.modalAmount}>{amount} VND</p>

            <InputField label="Nội dung" placeholder="Nhập nội dung giao dịch (tùy chọn)" />

            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setTransactionConfirmed(false)}>Hủy</Button>
              <Button onClick={handleConfirmPayment}>Xác nhận</Button>
            </div>
          </div>
        )}
      </main>

      <BottomNavBar activeTab="payments" />
    </div>
  );
};

export default Payment;