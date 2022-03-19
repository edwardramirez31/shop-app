import React from 'react';

import Header from '@components/common/Header';
import Nav from '@components/UI/Nav';

const MainLayout: React.FC = ({ children }) => (
  <div className="min-h-full">
    <Header />
    <Nav />
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6">{children}</div>
    </main>
  </div>
);

export default MainLayout;
