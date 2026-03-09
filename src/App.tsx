import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import SavedInvoices from './pages/SavedInvoices';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import CreateVoucher from './pages/CreateVoucher';

const App: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <Router>
      <div className="flex bg-[#fafafa] min-h-screen font-sans overflow-x-hidden">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarExpanded ? "ml-[260px]" : "ml-[80px]"
            }`}
        >
          <Navbar />
          <div className="p-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateInvoice />} />
              <Route path="/voucher" element={<CreateVoucher />} />
              <Route path="/invoices" element={<SavedInvoices />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
