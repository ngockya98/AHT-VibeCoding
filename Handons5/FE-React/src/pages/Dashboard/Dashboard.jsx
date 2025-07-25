import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import AccountCard from '../../components/AccountCard/AccountCard';
import QuickActionButton from '../../components/QuickActionButton/QuickActionButton';
import TransactionItem from '../../components/TransactionItem/TransactionItem';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { getAccountBalance, getRecentTransactions } from '../../services/api'; // Mock API

import styles from './Dashboard.module.css'; // Assume CSS Modules

const Dashboard = () => {
  const [balance, setBalance] = useState('...');
  const [transactions, setTransactions] = useState([]);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardData = async () => {
      const accountData = await getAccountBalance();
      const transactionData = await getRecentTransactions();
      setBalance(accountData.balance);
      setTransactions(transactionData);
    };
    fetchDashboardData();
  }, []);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header
        title="My Bank"
        showBackButton={false}
        showNotifications={true}
        showProfile={true}
        onNotificationClick={() => console.log('Notifications clicked')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      <main className={styles.mainContent}>
        <AccountCard
          accountName="Current Account"
          balance={showBalance ? balance : '*******'}
          currency="VND"
          onToggleVisibility={toggleBalanceVisibility}
        />

        <section className={styles.quickActions}>
          <QuickActionButton icon="transfer.svg" label="Chuyển khoản" onClick={() => console.log('Transfer')} />
          <QuickActionButton icon="paybills.svg" label="Thanh toán hóa đơn" onClick={() => console.log('Pay Bills')} />
          <QuickActionButton icon="topup.svg" label="Nạp tiền ĐT" onClick={() => console.log('Top Up')} />
          <QuickActionButton icon="savings.svg" label="Tiết kiệm" onClick={() => console.log('Savings')} />
          {/* More actions can be added and made scrollable */}
        </section>

        <section className={styles.recentTransactions}>
          <h2 className={styles.sectionTitle}>Giao dịch gần đây</h2>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                description={transaction.description}
                amount={transaction.amount}
                date={transaction.date}
                type={transaction.type}
              />
            ))
          ) : (
            <p className={styles.noTransactions}>Không có giao dịch gần đây.</p>
          )}
          <button className={styles.viewAllButton} onClick={() => console.log('View all transactions')}>
            Xem tất cả
          </button>
        </section>
      </main>

      <BottomNavBar activeTab="home" />
    </div>
  );
};

export default Dashboard;