import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

import styles from './KYC.module.css';

const KYC = () => {
  const [step, setStep] = useState(1); // 1: Document Upload, 2: Selfie, 3: Review
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState(null); // 'success', 'error'

  const handleImageUpload = (e, setImageSetter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSetter(reader.result); // Base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!idFrontImage || !idBackImage)) {
      alert('Vui lòng tải lên cả mặt trước và mặt sau giấy tờ tùy thân.');
      return;
    }
    if (step === 2 && !selfieImage) {
      alert('Vui lòng chụp ảnh chân dung (selfie).');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmitKYC = async () => {
    setIsLoading(true);
    // Simulate API call for KYC submission
    try {
      // In a real app, send idFrontImage, idBackImage, selfieImage to backend
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network request
      setKycStatus('success');
    } catch (error) {
      setKycStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.kycContainer}>
        <Header title="Xác minh danh tính" showBackButton={true} />
        <main className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Đang xử lý xác minh danh tính của bạn...</p>
        </main>
      </div>
    );
  }

  if (kycStatus === 'success') {
    return (
      <div className={styles.kycContainer}>
        <Header title="Xác minh danh tính" showBackButton={true} />
        <main className={styles.successState}>
          <img src="/src/assets/icons/success.svg" alt="Success" className={styles.statusIcon} />
          <h2>Xác minh thành công!</h2>
          <p>Tài khoản của bạn đã được xác minh. Bạn có thể sử dụng đầy đủ các tính năng.</p>
          <Button onClick={() => window.location.href = '/dashboard'}>Về trang chủ</Button>
        </main>
      </div>
    );
  }

  if (kycStatus === 'error') {
    return (
      <div className={styles.kycContainer}>
        <Header title="Xác minh danh tính" showBackButton={true} />
        <main className={styles.errorState}>
          <img src="/src/assets/icons/error.svg" alt="Error" className={styles.statusIcon} />
          <h2>Xác minh thất bại</h2>
          <p>Có lỗi xảy ra trong quá trình xác minh. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
          <Button onClick={() => { setKycStatus(null); setStep(1); }}>Thử lại</Button>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.kycContainer}>
      <Header title="Xác minh danh tính" showBackButton={true} />

      <main className={styles.mainContent}>
        <div className={styles.progressBar}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. Giấy tờ</div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. Chụp ảnh</div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. Hoàn tất</div>
        </div>

        {step === 1 && (
          <section className={styles.stepSection}>
            <h2>Bước 1: Tải lên giấy tờ tùy thân</h2>
            <p>Vui lòng chụp ảnh rõ nét mặt trước và mặt sau của CCCD/CMND hoặc Hộ chiếu của bạn.</p>
            <div className={styles.uploadBox}>
              <label htmlFor="idFrontUpload" className={styles.uploadLabel}>
                {idFrontImage ? (
                  <img src={idFrontImage} alt="ID Front Preview" className={styles.imagePreview} />
                ) : (
                  <>
                    <img src="/src/assets/icons/upload.svg" alt="Upload" className={styles.uploadIcon} />
                    <span>Tải lên mặt trước</span>
                  </>
                )}
              </label>
              <input
                id="idFrontUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIdFrontImage)}
                className={styles.hiddenInput}
              />
            </div>
            <div className={styles.uploadBox}>
              <label htmlFor="idBackUpload" className={styles.uploadLabel}>
                {idBackImage ? (
                  <img src={idBackImage} alt="ID Back Preview" className={styles.imagePreview} />
                ) : (
                  <>
                    <img src="/src/assets/icons/upload.svg" alt="Upload" className={styles.uploadIcon} />
                    <span>Tải lên mặt sau</span>
                  </>
                )}
              </label>
              <input
                id="idBackUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIdBackImage)}
                className={styles.hiddenInput}
              />
            </div>
            <Button onClick={handleNextStep}>Tiếp tục</Button>
          </section>
        )}

        {step === 2 && (
          <section className={styles.stepSection}>
            <h2>Bước 2: Chụp ảnh chân dung (Selfie)</h2>
            <p>Đảm bảo khuôn mặt của bạn nằm gọn trong khung hình và đủ ánh sáng.</p>
            <div className={styles.selfieCamera}>
              {selfieImage ? (
                <img src={selfieImage} alt="Selfie Preview" className={styles.imagePreview} />
              ) : (
                <>
                  {/* Simulate camera feed with an overlay */}
                  <div className={styles.cameraFrame}>
                    <div className={styles.faceOverlay}></div>
                  </div>
                  <p>Mô phỏng camera</p>
                </>
              )}
              <input
                id="selfieUpload"
                type="file"
                accept="image/*"
                capture="user" // Hint to open front camera on mobile
                onChange={(e) => handleImageUpload(e, setSelfieImage)}
                className={styles.hiddenInput}
              />
              <Button onClick={() => document.getElementById('selfieUpload').click()}>
                {selfieImage ? 'Chụp lại' : 'Chụp ảnh'}
              </Button>
            </div>
            <Button onClick={handleNextStep}>Tiếp tục</Button>
          </section>
        )}

        {step === 3 && (
          <section className={styles.stepSection}>
            <h2>Bước 3: Xem lại và gửi</h2>
            <p>Vui lòng kiểm tra lại thông tin và hình ảnh trước khi gửi.</p>
            <div className={styles.reviewImages}>
              <div className={styles.reviewItem}>
                <h4>Mặt trước giấy tờ</h4>
                {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
              </div>
              <div className={styles.reviewItem}>
                <h4>Mặt sau giấy tờ</h4>
                {idBackImage && <img src={idBackImage} alt="ID Back" />}
              </div>
              <div className={styles.reviewItem}>
                <h4>Ảnh chân dung</h4>
                {selfieImage && <img src={selfieImage} alt="Selfie" />}
              </div>
            </div>
            <div className={styles.consent}>
              <input type="checkbox" id="consent" />
              <label htmlFor="consent">Tôi đồng ý cho phép ngân hàng sử dụng thông tin và hình ảnh trên để xác minh danh tính.</label>
            </div>
            <Button onClick={handleSubmitKYC}>Gửi xác minh</Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default KYC;