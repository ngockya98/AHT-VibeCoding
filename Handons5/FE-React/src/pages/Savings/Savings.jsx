import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { getSavingsGoals, createSavingsGoal } from '../../services/api'; // Mock API

import styles from './Savings.module.css';

const Savings = () => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: 0,
    targetDate: ''
  });

  useEffect(() => {
    const fetchGoals = async () => {
      const data = await getSavingsGoals();
      setSavingsGoals(data);
    };
    fetchGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleCreateGoal = async () => {
    if (newGoal.name && newGoal.targetAmount) {
      await createSavingsGoal(newGoal); // Mock API call
      setSavingsGoals([...savingsGoals, { ...newGoal, id: Date.now(), progress: 0 }]); // Add to local state
      setShowCreateForm(false);
      setNewGoal({ name: '', targetAmount: '', currentAmount: 0, targetDate: '' });
      alert('Mục tiêu tiết kiệm đã được tạo!');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin mục tiêu.');
    }
  };

  const calculateProgress = (current, target) => {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100);
  };

  return (
    <div className={styles.savingsContainer}>
      <Header title="Tiết kiệm" showBackButton={true} />

      <main className={styles.mainContent}>
        {!showCreateForm ? (
          <section className={styles.goalsList}>
            <h2 className={styles.sectionTitle}>Mục tiêu tiết kiệm của bạn</h2>
            {savingsGoals.length > 0 ? (
              savingsGoals.map(goal => (
                <div key={goal.id} className={styles.goalItem}>
                  <h3>{goal.name}</h3>
                  <p>Hiện có: {goal.currentAmount.toLocaleString()} VND</p>
                  <p>Mục tiêu: {goal.targetAmount.toLocaleString()} VND</p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                    ></div>
                  </div>
                  <span>Tiến độ: {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}%</span>
                  {goal.targetDate && <p>Hạn chót: {goal.targetDate}</p>}
                  <Button variant="secondary" onClick={() => console.log('View details for', goal.name)}>
                    Xem chi tiết
                  </Button>
                </div>
              ))
            ) : (
              <p className={styles.noGoals}>Bạn chưa có mục tiêu tiết kiệm nào.</p>
            )}
            <Button className={styles.createGoalButton} onClick={() => setShowCreateForm(true)}>
              + Tạo mục tiêu mới
            </Button>
          </section>
        ) : (
          <section className={styles.createGoalForm}>
            <h2 className={styles.sectionTitle}>Tạo mục tiêu tiết kiệm mới</h2>
            <InputField
              label="Tên mục tiêu"
              name="name"
              value={newGoal.name}
              onChange={handleInputChange}
              placeholder="Ví dụ: Du lịch Châu Âu, Mua nhà"
            />
            <InputField
              label="Số tiền mục tiêu (VND)"
              name="targetAmount"
              type="number"
              value={newGoal.targetAmount}
              onChange={handleInputChange}
              placeholder="Ví dụ: 50.000.000"
            />
            <InputField
              label="Ngày hoàn thành dự kiến"
              name="targetDate"
              type="date"
              value={newGoal.targetDate}
              onChange={handleInputChange}
            />
            <div className={styles.formActions}>
              <Button variant="secondary" onClick={() => setShowCreateForm(false)}>Hủy</Button>
              <Button onClick={handleCreateGoal}>Tạo mục tiêu</Button>
            </div>
          </section>
        )}
      </main>

      <BottomNavBar activeTab="savings" />
    </div>
  );
};

export default Savings;