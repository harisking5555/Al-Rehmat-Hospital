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

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (doctorId?: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setPreselectedDoctorId(undefined);
  };

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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

      {/* Hospital Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Interactive Doctor & Department Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedDoctorId={preselectedDoctorId}
      />
    </div>
  );
}
