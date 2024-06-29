import React from 'react';

interface HeaderProps {
  logoSrc: string;
  balance: number;
  onTopUp: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, balance, onTopUp, onLogout }) => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img src={logoSrc} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.center}>
        <span style={styles.balance}>Balance: ${balance.toFixed(2)}</span>
        <button style={styles.topUpButton} onClick={onTopUp}>Top Up</button>
      </div>
      <div style={styles.right}>
        <button style={styles.logoutButton} onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef'
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo: {
    height: '40px'
  },
  balance: {
    marginRight: '20px',
    fontSize: '18px'
  },
  topUpButton: {
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  logoutButton: {
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer'
  }
} as const;

export default Header;
