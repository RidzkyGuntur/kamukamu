import React from 'react';

interface HeaderProps {
  balance: number;
  onTopUp: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, onTopUp, onLogout }) => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div>
          <img src={require('../images/logo.png')} alt="Logo" className='w-10 h-10' />
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <span className='text-sm'>Balance: ${balance.toFixed(2)}</span>
          <button className='bg-white text-blue-500 px-4 py-2 rounded-md' onClick={onTopUp}>Top Up</button>
          <button className='bg-white text-blue-500 px-4 py-2 rounded-md' onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;