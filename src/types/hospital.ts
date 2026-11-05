export interface Doctor {
  id: string;
  name: string;
  urduName: string;
  title: string;
  department: string;
  departmentUrdu: string;
  qualification: string;
  experience: string;
  specialties: string[];
  timing: string;
  days: string[];
  image: string;
  gender: 'male' | 'female';
  isGoldMedalist?: boolean;
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  urduName: string;
  description: string;
  iconName: string;
  headDoctor: string;
  keyServices: string[];
  commonConditions: string[];
  operatingHours: string;
  image: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  turnaroundTime: string;
  fastingRequired: boolean;
  description: string;
}

export interface Facility {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  hours: string;
}

export interface AppointmentRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  patientGender: 'male' | 'female' | 'other';
  doctorId: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Review';
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  comment: string;
  doctorConsulted: string;
  rating: number;
  date: string;
}
