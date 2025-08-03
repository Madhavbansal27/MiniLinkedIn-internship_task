import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-gray-50">
      <Header />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;