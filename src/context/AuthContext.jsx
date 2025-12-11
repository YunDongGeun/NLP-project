import { createContext, useContext, useState } from 'react';

// 하드코딩된 가짜 계정 2개
const MOCK_ACCOUNTS = [
  { id: 'user1', name: '사용자 1', avatar: '👤' },
  { id: 'user2', name: '사용자 2', avatar: '👥' }
];

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(MOCK_ACCOUNTS[0]); // 기본값: user1

  const switchUser = (userId) => {
    const user = MOCK_ACCOUNTS.find(account => account.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const value = {
    currentUser,
    switchUser,
    accounts: MOCK_ACCOUNTS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
