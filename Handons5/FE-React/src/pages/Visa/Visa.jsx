import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import VirtualCard from '../../components/VirtualCard/VirtualCard';
import Button from '../../components/Button/Button';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { getVirtualCardDetails } from '../../services/api'; // Mock API

import styles from './Visa.module.css';

const Visa = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false); // To toggle card number, CVV
  const [cardStatus, setCardStatus] = useState('active'); // 'active' or 'frozen'

  useEffect(() => {
    const fetchCardDetails = async () => {
      const data = await getVirtualCardDetails();
      setCardDetails(data);
    };
    fetchCardDetails();
  }, []);

  const toggleFullDetails = () => {
    // In a real app, this might require a PIN/biometric authentication
    setShowFullDetails(!showFullDetails);
  };

  const toggleCardStatus = () => {
    setCardStatus(prevStatus => prevStatus === 'active' ? 'frozen' : 'active');
    alert(`Thẻ đã được ${cardStatus === 'active' ? 'đóng băng' : 'kích hoạt lại'}.`);
  };

  if (!cardDetails) {
    return (
      <div className={styles.visaContainer}>
        <Header title="Thẻ ảo" showBackButton={true} />
        <main className={styles.loadingState}>
          <p>Đang tải thông tin thẻ...</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.visaContainer}>
      <Header title="Thẻ ảo Visa" showBackButton={true} />

      <main className={styles.mainContent}>
        <VirtualCard
          cardNumber={cardDetails.cardNumber}
          cardholderName={cardDetails.cardholderName}
          expiryDate={cardDetails.expiryDate}
          cvv={cardDetails.cvv}
          showFullDetails={showFullDetails}
          onToggleDetails={toggleFullDetails}
          isFrozen={cardStatus === 'frozen'}
        />

        <section className={styles.qrPaymentSection}>
          <h2 className={styles.sectionTitle}>Thanh toán bằng QR Code</h2>
          <div className={styles.qrCodeContainer}>
            {/* Placeholder for QR Code image generation */}
            <img src="/src/assets/images/qr-code-example.png" alt="QR Code" className={styles.qrImage} />
            <p>Quét mã này để thanh toán tại các điểm chấp nhận QR Pay.</p>
          </div>
          <Button variant="secondary" onClick={() => console.log('Share QR')}>
            Chia sẻ QR Code
          </Button>
        </section>

        <section className={styles.cardManagement}>
          <h2 className={styles.sectionTitle}>Quản lý thẻ</h2>
          <div className={styles.managementOptions}>
            <Button onClick={toggleCardStatus}>
              {cardStatus === 'active' ? 'Đóng băng thẻ' : 'Kích hoạt lại thẻ'}
            </Button>
            <Button variant="secondary" onClick={() => alert('Đang chuyển đến màn hình đổi PIN')}>Đổi mã PIN</Button>
            <Button variant="secondary" onClick={() => alert('Đang chuyển đến màn hình cài đặt hạn mức')}>Đặt hạn mức chi tiêu</Button>
            <Button variant="secondary" onClick={() => console.log('View card transactions')}>Xem lịch sử giao dịch</Button>
          </div>
        </section>
      </main>

      <BottomNavBar activeTab="cards" />
    </div>
  );
};

export default Visa;