import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doctor } from '../types/hospital';
import { DOCTORS_DATA } from '../data/hospitalData';

interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (newDoctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, updatedFields: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  resetDoctorsToDefault: () => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'alrehmat_hospital_doctors_v1';
const AUTH_KEY = 'alrehmat_admin_auth_v1';
const ADMIN_SECRET = '24/7';

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on error
    }
    return DOCTORS_DATA;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save doctors changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
    } catch {
      // Ignore quota error if any
    }
  }, [doctors]);

  const addDoctor = (newDoc: Omit<Doctor, 'id'>) => {
    const generatedId = `doc-${Date.now()}`;
    const doctorWithId: Doctor = {
      ...newDoc,
      id: generatedId,
    };
    setDoctors((prev) => [...prev, doctorWithId]);
  };

  const updateDoctor = (id: string, updatedFields: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updatedFields } : doc))
    );
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  const resetDoctorsToDefault = () => {
    setDoctors(DOCTORS_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const loginAdmin = (password: string): boolean => {
    if (password.trim() === ADMIN_SECRET) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        resetDoctorsToDefault,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = (): DoctorContextType => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};
