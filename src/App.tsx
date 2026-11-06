/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminLoginModal } from './components/AdminLoginModal';

import { DoctorProvider, useDoctors } from './context/DoctorContext';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function MainHospitalApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);
  
  const { isAdminLoggedIn } = useDoctors();

  const handleOpenBooking = (doctorId?: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setPreselectedDoctorId(undefined);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setActiveTab('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setActiveTab('admin');
  };

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // If in admin view and authorized, show dedicated Admin Dashboard
  if (activeTab === 'admin' && isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-red-600 selection:text-white">
        <CustomCursor />
        <AdminPage onBackToSite={() => setActiveTab('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-red-600 selection:text-white">
      
      {/* Subtle modern cursor tracking effect */}
      <CustomCursor />

      {/* Top 24/7 Running Marquee Ticker */}
      <EmergencyBanner />

      {/* Main Navigation Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Dynamic Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={setActiveTab}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'services' && (
          <DepartmentsPage
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorsPage
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilitiesPage />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Hospital Footer with subtle Admin Portal link */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Interactive Doctor & Department Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedDoctorId={preselectedDoctorId}
      />

      {/* Secure Passcode Protected Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <DoctorProvider>
      <MainHospitalApp />
    </DoctorProvider>
  );
}
