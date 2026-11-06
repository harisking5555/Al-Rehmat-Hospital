import { Doctor, Department, LabTest, Facility, Testimonial } from '../types/hospital';

export const HOSPITAL_INFO = {
  name: "Al Rehmat Hospital",
  abbr: "ARH",
  tagline: "24/7 Quality Healthcare & Diagnostic Center",
  logo: "https://i.postimg.cc/0N8V7NR7/Whats-App-Image-2026-10-28-at-12-45-09-PM.jpg",
  email: "alrehmathospital01@gmail.com",
  phone: "0319-1401391",
  phoneRaw: "03191401391",
  directCallPhone: "0319-1401391",
  directCallRaw: "03191401391",
  whatsappNumber: "923191401391",
  emergencyPhone: "0319-1401391",
  patron: "Dr. Aslam Raza (MS)",
  address: "Verpal Chatta, Saim Nala, Gujranwala, Punjab, Pakistan",
  secondaryBranch: "Sialkot Bypass, Opposite Sheikh Siddique Eye Hospital, Gujranwala",
  emergencyHours: "24 Hours / 7 Days a Week",
  opdHours: "Daily 09:00 AM – 07:00 PM",
  chughtaiLabHours: "24/7 Homecare & Sample Collection",
};

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-aslam",
    name: "Dr. Aslam Raza (MS)",
    urduName: "",
    title: "Senior Medical Consultant & Physician",
    department: "General Medicine & Clinical Care",
    departmentUrdu: "",
    qualification: "D.H.M.S, R.H.M.P",
    experience: "Decades of dedicated clinical practice, community medicine, and family wellness",
    specialties: [
      "Comprehensive Clinical Consultations",
      "Chronic Disease Management & Counseling",
      "Community Wellness & Holistic Healthcare"
    ],
    timing: "Daily: 09:30 AM – 05:30 PM",
    days: ["Daily"],
    image: "https://i.postimg.cc/xjHywSq5/Dr-aslam-Raza.jpg",
    gender: "male",
    notes: "Senior clinical consultant at Al Rehmat Hospital."
  },
  {
    id: "dr-nadeem-aslam",
    name: "Dr. Nadeem Aslam Sikandar",
    urduName: "",
    title: "Senior Child & Medical Specialist",
    department: "Pediatrics & General Medicine",
    departmentUrdu: "",
    qualification: "M.B.B.S, M.D (Russia), P.M.D.C, R.M.P, MCPS Medicine (R)",
    experience: "Fellowship in Aesthetic Medicine · Ex-Medical Officer Civil Hospital Gujranwala",
    specialties: [
      "Child Developmental Delays & Malnutrition",
      "Speech & Walking Milestone Delays",
      "Hypertension, Diabetes & Stroke Recovery",
      "Pediatric Infections & Acute Fevers"
    ],
    timing: "Monday to Saturday: 09:00 AM – 05:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    image: "https://i.postimg.cc/rFJqNTVq/Dr-nadeem.jpg",
    gender: "male",
    notes: "Specialist in pediatric developmental delays and acute medicine."
  },
  {
    id: "dr-nazia-jabeen",
    name: "Lady Dr. Nazia Jabeen (LHV)",
    urduName: "",
    title: "Consultant Gynecologist & Maternity Specialist (LHV)",
    department: "Gynecology & Obstetrics",
    departmentUrdu: "",
    qualification: "",
    experience: "Comprehensive clinical experience in maternal care, labor suites, and prenatal health",
    specialties: [
      "Normal Delivery & Antenatal Checkups",
      "Postnatal Health & Lactation Support"
    ],
    timing: "Daily: 09:00 AM – 02:00 PM",
    days: ["Daily"],
    image: "https://i.postimg.cc/ZKcJxmb4/dr-nazia.jpg",
    gender: "female",
    notes: "Daily outpatient and emergency maternity management with full female clinical team."
  },
  {
    id: "dr-javeria-safdar",
    name: "Lady Dr. Javeria Safdar",
    urduName: "",
    title: "Senior Physiotherapist & Neuro-Rehab Specialist",
    department: "Physiotherapy & Rehabilitation",
    departmentUrdu: "",
    qualification: "Doctor of Physical Therapy (D.P.T, University of Lahore)",
    experience: "Specialist in neurological rehabilitation and orthopedic physiotherapy",
    specialties: [
      "Stroke & Paralysis Rehabilitation",
      "Sciatica & Lumbar Disc Herniation",
      "Pediatric Cerebral Palsy & Joint Pain",
      "Post-Surgical Joint Mobilization"
    ],
    timing: "Daily: 09:00 AM – 02:00 PM",
    days: ["Daily"],
    image: "https://i.postimg.cc/qMLpxrJJ/Dr-jaweria.jpg",
    gender: "female",
    notes: "Equipped with mechanical traction and modern electrotherapy."
  },
  {
    id: "dr-hammad-amin",
    name: "Dr. Hammad Amin Mirza",
    urduName: "",
    title: "Consultant ENT Surgeon & Allergologist",
    department: "ENT (Ear, Nose, Throat)",
    departmentUrdu: "",
    qualification: "M.B.B.S, F.C.P.S (ENT)",
    experience: "Member EAACI & ERS · Academic Registrar ENT Gujranwala Teaching Hospital",
    specialties: [
      "Sinusitis & Endoscopic Sinus Surgery",
      "Allergic Rhinitis, Polyps & Hearing Loss",
      "Tonsillitis & Balance / Vertigo Disorders"
    ],
    timing: "Wednesday: 03:00 PM – 05:00 PM",
    days: ["Wednesday"],
    image: "https://i.postimg.cc/5N3fSJ4X/Dr-hammad.jpg",
    gender: "male",
    notes: "Academic registrar and rhinologic allergy specialist."
  },
  {
    id: "dr-jawad-malik",
    name: "Dr. Jawad Malik",
    urduName: "",
    title: "Specialist Urologist & Andrologist",
    department: "Urology & Kidney Care",
    departmentUrdu: "",
    qualification: "M.B.B.S, M.S (M.D Russia)",
    experience: "Resident M.S Urology GMC / DHQ Teaching Hospital Gujranwala under Prof. Dr. Khalid Hassan",
    specialties: [
      "Kidney & Bladder Stones Treatment",
      "Male Infertility & Prostate Enlargement",
      "Urinary Tract Infections & Obstructions"
    ],
    timing: "Sunday: 11:00 AM – 02:00 PM",
    days: ["Sunday"],
    image: "https://i.postimg.cc/3r28Wpzy/Dr-jawad.jpg",
    gender: "male",
    notes: "Minimally invasive urological management and kidney stone laser treatment."
  },
  {
    id: "dr-nabeela-aslam",
    name: "Lady Dr. Nabeela Aslam",
    urduName: "",
    title: "Consultant Gynecologist & Radiologist",
    department: "Gynecology & Radiology",
    departmentUrdu: "",
    qualification: "MBBS, NLE, RMP (Pak), MCPS Obstetrics & Gynaecology, Diploma in Radiology (Russia)",
    experience: "Extensive surgical & ultrasound clinical training in maternal obstetrics and diagnostic imaging",
    isGoldMedalist: false,
    specialties: [
      "Obstetrics & High-Risk Pregnancy Management",
      "Diagnostic Ultrasound & Fetal Anomaly Scans",
      "Gynecological Infertility & PCOS Care",
      "Normal Delivery & Cesarean Sections"
    ],
    timing: "Wednesday: 10:00 AM – 01:00 PM",
    days: ["Wednesday"],
    image: "https://i.postimg.cc/gkpKzzJy/Dr-Nabeela.jpg",
    gender: "female",
    notes: "Expertise in dual specialties: Obstetrics & Gynecology plus specialized Radiology."
  },
  {
    id: "dr-anam-saleem",
    name: "Lady Dr. Anam Saleem",
    urduName: "",
    title: "Consultant Gynecologist & Infertility Specialist",
    department: "Gynecology & Obstetrics",
    departmentUrdu: "",
    qualification: "M.B.B.S, B.Sc, P.M.D.C, M.S (Gyne & Obs)",
    experience: "Gold Medalist · Ex-Registrar Gyne Ward (Civil Hospital Daska & Allama Iqbal Teaching Hospital Sialkot)",
    isGoldMedalist: true,
    specialties: [
      "Infertility & Hormonal Imbalance (PCOS)",
      "Normal Delivery & Cesarean Section",
      "Uterine Fibroids & Ovarian Cysts"
    ],
    timing: "Sunday: 10:00 AM – 02:00 PM",
    days: ["Sunday"],
    image: "https://i.postimg.cc/tRPtKH7B/LADY-Dr-anam.jpg",
    gender: "female",
    notes: "Gold Medalist consultant specializing in high-risk obstetrics."
  },
  {
    id: "dr-syeda-malaika",
    name: "Lady Dr. Saira Malaika",
    urduName: "",
    title: "MIT Diagnostic Sonographer & Ultrasound Specialist",
    department: "Diagnostic Ultrasound & Imaging",
    departmentUrdu: "",
    qualification: "B.Sc MIT (Medical Imaging Technology), Certified Diagnostic Sonographer",
    experience: "Specialist in 3D/4D Obstetric Ultrasounds, Doppler Studies & Abdominal Scans",
    isGoldMedalist: false,
    specialties: [
      "Pelvic & Maternal Pregnancy Ultrasound",
      "Abdominal & Renal Doppler Studies",
      "Thyroid, Breast & Soft Tissue Ultrasound",
      "Fetal Growth & Anomaly Screening"
    ],
    timing: "Daily: 02:30 PM – 05:30 PM",
    days: ["Daily"],
    image: "https://i.postimg.cc/3RWNgbBQ/Dr-malaika.jpg",
    gender: "female",
    notes: "Dedicated female sonographer offering complete privacy and precision scans."
  }
];

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    urduName: "",
    description: "Complete women's healthcare, normal deliveries, C-sections, PCOS, and specialized infertility management with all-female medical team.",
    iconName: "HeartHandshake",
    headDoctor: "Lady Dr. Nabeela Aslam, Lady Dr. Anam Saleem & Lady Dr. Nazia Jabeen",
    keyServices: [
      "Normal Delivery & Cesarean Section (C-Section)",
      "Advanced Infertility Treatment & Ovulation Tracking",
      "PCOS & Hormonal Imbalance Clinic",
      "Antenatal, Natal & Postnatal Complete Care"
    ],
    commonConditions: [
      "Infertility & Conception Delays",
      "Irregular Menstrual Cycles & Bleeding",
      "Uterine Fibroids & Ovarian Cysts"
    ],
    operatingHours: "Daily OPD: 09:00 AM – 02:00 PM & Specialist Days | 24/7 Maternity Emergency",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "ultrasound-diagnostics",
    name: "Ultrasound & Diagnostic Sonography",
    urduName: "",
    description: "High-definition diagnostic ultrasound imaging wing led by certified sonographers and radiologists for pregnancy, pelvic, and abdominal health.",
    iconName: "Microscope",
    headDoctor: "Lady Dr. Saira Malaika & Lady Dr. Nabeela Aslam",
    keyServices: [
      "Routine & High-Resolution Obstetric Ultrasound",
      "Abdominal, Liver, Gallbladder & Kidney Scans",
      "Pelvic & Female Reproductive Scans",
      "Doppler Vascular Studies & Fetal Anomaly Screening"
    ],
    commonConditions: [
      "Pregnancy Well-being & Fetal Milestones",
      "Gallstones, Kidney Stones & Hydronephrosis",
      "Ovarian Cysts & Pelvic Pain Evaluation"
    ],
    operatingHours: "Daily: 02:30 PM – 05:30 PM & 24/7 Emergency Scans",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "pediatrics-neonatology",
    name: "Pediatrics & Child Health",
    urduName: "",
    description: "Dedicated child healthcare for infants, toddlers, and adolescents covering developmental milestones and nutrition.",
    iconName: "Baby",
    headDoctor: "Dr. Nadeem Aslam Sikandar (MBBS, MD)",
    keyServices: [
      "Delayed Milestone Care (Speech & Walking)",
      "Child Malnutrition & Rickets Treatment",
      "Pediatric Vaccination & Preventive Care",
      "Acute Childhood Fevers & Infections"
    ],
    commonConditions: [
      "Speech & Motor Walking Delays",
      "Childhood Weakness & Stunted Growth",
      "Respiratory Infections & Bronchitis"
    ],
    operatingHours: "Monday to Saturday: 09:00 AM – 05:00 PM | 24/7 Emergency",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "general-medicine",
    name: "General Medicine & Outpatient OPD",
    urduName: "",
    description: "Comprehensive day-long outpatient medical consultations, diabetes, hypertension, and primary acute medical management.",
    iconName: "Stethoscope",
    headDoctor: "Dr. Aslam Raza (MS)",
    keyServices: [
      "Full-Day Outpatient Consultations",
      "Diabetes & Blood Pressure Management",
      "Preventive Health Checkups & Triage",
      "Chronic Disease Clinical Supervision"
    ],
    commonConditions: [
      "Seasonal Fevers, Flu & Respiratory Ailments",
      "Uncontrolled Blood Pressure & Blood Sugar",
      "Gastrointestinal Complaints & Weakness"
    ],
    operatingHours: "Daily: 09:30 AM – 05:30 PM | 24/7 Emergency",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "urology-kidney",
    name: "Urology & Kidney Care",
    urduName: "",
    description: "Clinical and surgical management of kidneys, urinary bladder, prostate health, and male reproductive wellness.",
    iconName: "ShieldAlert",
    headDoctor: "Dr. Jawad Malik (MBBS, MS)",
    keyServices: [
      "Kidney & Bladder Stones Treatment",
      "Male Infertility Evaluation",
      "Prostate Health & Bladder Strictures",
      "Urinary Tract Infection Protocols"
    ],
    commonConditions: [
      "Kidney Stone Pain & Colic",
      "Urinary Difficulty & Burning",
      "Male Subfertility"
    ],
    operatingHours: "Sunday: 11:00 AM – 02:00 PM",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "ent-head-neck",
    name: "ENT (Ear, Nose & Throat)",
    urduName: "",
    description: "Specialized care for chronic sinus problems, seasonal allergies, throat conditions, and hearing impairments.",
    iconName: "Activity",
    headDoctor: "Dr. Hammad Amin Mirza (FCPS, EAACI, ERS)",
    keyServices: [
      "Endoscopic Sinus Diagnosis",
      "Allergic Rhinitis Desensitization",
      "Tonsillitis & Adenoid Care",
      "Hearing Loss & Vertigo Relief"
    ],
    commonConditions: [
      "Chronic Sinusitis & Nasal Blockage",
      "Recurrent Throat Infections",
      "Ear Discharge & Dizziness"
    ],
    operatingHours: "Wednesday: 03:00 PM – 05:00 PM",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "physiotherapy-rehab",
    name: "Physiotherapy & Rehabilitation",
    urduName: "",
    description: "Modern rehabilitation gym equipped with mechanical traction, TENS electrotherapy, and neuro-recovery protocols.",
    iconName: "Accessibility",
    headDoctor: "Lady Dr. Javeria Safdar (DPT, UOL)",
    keyServices: [
      "Stroke (Paralysis) Neuro-Rehabilitation",
      "Sciatica & Spine Decompression",
      "Arthritis & Joint Mobilization",
      "Pediatric Cerebral Palsy Therapy"
    ],
    commonConditions: [
      "Post-Stroke Weakness",
      "Severe Sciatica & Disc Pain",
      "Knee Osteoarthritis & Back Pain"
    ],
    operatingHours: "Daily: 09:00 AM – 02:00 PM",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "emergency-critical-care",
    name: "24/7 Emergency & Acute Care",
    urduName: "",
    description: "Round-the-clock emergency medical response with triage beds, resuscitation, oxygen lines, and immediate doctor attendance.",
    iconName: "Ambulance",
    headDoctor: "Emergency Medical Officers On Duty",
    keyServices: [
      "Immediate Triage & Trauma Resuscitation",
      "Emergency Delivery & Gynecological Care",
      "Acute Pediatric Care & Nebulization",
      "24/7 Oxygen Supply & Vital Monitoring"
    ],
    commonConditions: [
      "Accidents & Acute Injuries",
      "Severe Chest Pain & Shortness of Breath",
      "Urgent Labor Pains & High Fevers"
    ],
    operatingHours: "24 Hours / 7 Days a Week",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "diagnostic-lab-pathology",
    name: "Chughtai Lab Diagnostic Center",
    urduName: "",
    description: "Official Chughtai Healthcare collection center providing computerized pathology, blood tests, and 24/7 home sample collection.",
    iconName: "Microscope",
    headDoctor: "Certified Pathology Technologists",
    keyServices: [
      "24/7 Blood & Specimen Sampling",
      "Home Blood Sample Collection",
      "Reports via WhatsApp & SMS",
      "Accredited Automated Analyzers"
    ],
    commonConditions: [
      "Routine Health Checkups",
      "Pregnancy Ultrasound & Blood Profiles",
      "Diabetes, Cholesterol & Hormone Monitoring"
    ],
    operatingHours: "24/7 Sampling Center & Dedicated Dispatch",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200"
  }
];

export const CHUGHTAI_LAB_TESTS: LabTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC with ESR)",
    category: "Hematology",
    turnaroundTime: "Same Day",
    fastingRequired: false,
    description: "Screens for anemia, white cell counts, platelets, and hidden viral or bacterial infections."
  },
  {
    id: "lft",
    name: "Liver Function Tests (LFT)",
    category: "Biochemistry",
    turnaroundTime: "Same Day",
    fastingRequired: true,
    description: "Evaluates liver enzymes (ALT, AST, Bilirubin) to assess hepatic health and jaundice."
  },
  {
    id: "rft",
    name: "Kidney Function Tests (RFT - Urea & Creatinine)",
    category: "Nephrology",
    turnaroundTime: "Same Day",
    fastingRequired: false,
    description: "Assesses kidney filtration function and detects renal impairment early."
  },
  {
    id: "lipid",
    name: "Lipid Profile (Cholesterol & Triglycerides)",
    category: "Cardiac",
    turnaroundTime: "Same Day",
    fastingRequired: true,
    description: "Evaluates cardiovascular risks and cholesterol levels."
  },
  {
    id: "hba1c",
    name: "HbA1c (3-Month Average Blood Sugar)",
    category: "Endocrinology",
    turnaroundTime: "Same Day",
    fastingRequired: false,
    description: "Gold-standard test for diabetic monitoring and glycemic control."
  },
  {
    id: "thyroid",
    name: "Thyroid Profile (TSH, Free T3, Free T4)",
    category: "Hormones",
    turnaroundTime: "24 Hours",
    fastingRequired: false,
    description: "Measures thyroid hormone levels affecting metabolism, weight, and energy."
  },
  {
    id: "fertility",
    name: "Female Infertility Hormonal Panel (FSH, LH, AMH)",
    category: "Gynecology",
    turnaroundTime: "24 - 48 Hours",
    fastingRequired: false,
    description: "Crucial hormonal evaluation for ovarian reserve, ovulatory function, and PCOS."
  },
  {
    id: "ultrasound",
    name: "Abdominal & Pelvic Ultrasound",
    category: "Radiology",
    turnaroundTime: "Instant Result (Daily 2:30 PM – 5:30 PM)",
    fastingRequired: true,
    description: "High-resolution real-time imaging conducted by Lady Dr. Saira Malaika & Lady Dr. Nabeela Aslam."
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: "emergency-room",
    name: "24/7 Emergency & Acute Trauma Ward",
    tagline: "Always open, equipped for life-saving interventions",
    description: "Staffed round-the-clock by medical officers, equipped with vital monitors, oxygen lines, and emergency medications.",
    features: [
      "Immediate triage by medical doctors",
      "Dedicated resuscitation & observation beds",
      "Emergency pediatric and maternity stabilization"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900",
    hours: "Open 24/7"
  },
  {
    id: "ultrasound-suite",
    name: "Digital Ultrasound & Imaging Suite",
    tagline: "High-resolution diagnostic sonography for mothers & patients",
    description: "Equipped with multi-frequency probes, color Doppler, and supervised by Lady Dr. Saira Malaika (MIT Sonographer) & Lady Dr. Nabeela Aslam.",
    features: [
      "Dedicated female sonographer for complete privacy",
      "Obstetric 3D/4D pregnancy anomaly scans",
      "Abdominal, pelvic, renal, and vascular Doppler studies",
      "Instant reports delivered with clinical interpretation"
    ],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900",
    hours: "Daily 02:30 PM – 05:30 PM & 24/7 Emergency"
  },
  {
    id: "chughtai-lab",
    name: "Chughtai Lab Collection Center",
    tagline: "Pakistan's trusted diagnostic network inside Al Rehmat",
    description: "Accredited sample collection, barcode tracking, and computerized test reports delivered to your phone.",
    features: [
      "24/7 Blood & specimen collection",
      "Home sampling collection available",
      "Reports sent straight to WhatsApp"
    ],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=900",
    hours: "24/7 Operational"
  },
  {
    id: "maternity-suites",
    name: "Modern Labor Suites & Maternity Ward",
    tagline: "Safe, dignified childbirth with female staff",
    description: "Private, hygienic delivery suites with fetal heart monitoring and clean recovery rooms.",
    features: [
      "Female doctors & trained nursing staff",
      "Continuous fetal heart monitoring",
      "Painless delivery support & baby warmers"
    ],
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=900",
    hours: "24/7 Maternity Service"
  },
  {
    id: "operation-theater",
    name: "Sterile Operation Theatres",
    tagline: "Laminar airflow & autoclave sterilization",
    description: "Engineered for C-sections, general surgeries, and urological procedures under sterile conditions.",
    features: [
      "HEPA-filtered sterile environment",
      "Continuous cardiac & anesthetic monitoring",
      "Post-operative recovery unit"
    ],
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=900",
    hours: "Elective & Emergency Surgical Coverage"
  },
  {
    id: "physio-center",
    name: "Physiotherapy & Neuro-Rehabilitation Gym",
    tagline: "Restoring mobility & relieving pain",
    description: "Equipped with mechanical traction, muscle stimulation, and specialized stroke rehab protocols.",
    features: [
      "Targeted spine decompression for sciatica",
      "Customized stroke recovery programs",
      "Individualized one-on-one sessions"
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900",
    hours: "Daily 09:00 AM – 02:00 PM"
  },
  {
    id: "pharmacy",
    name: "In-House 24/7 Pharmacy",
    tagline: "100% authentic, temperature-controlled medicines",
    description: "Full stock of manufacturer-sealed oral, pediatric, and intravenous pharmaceuticals.",
    features: [
      "100% genuine medications",
      "Pediatric formulas & emergency IV fluids",
      "Open 24 hours including holidays"
    ],
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=900",
    hours: "Open 24/7"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    patientName: "Muhammad Zubair Khan",
    location: "Gujranwala",
    doctorConsulted: "Dr. Nadeem Aslam Sikandar",
    rating: 5,
    comment: "My 3-year-old son had speech delay. Dr. Nadeem Aslam diagnosed his deficiencies accurately, and within two months we saw immense progress in his talking.",
    date: "October 2026"
  },
  {
    id: "t2",
    patientName: "Farzana Begum",
    location: "Verpal Chatta",
    doctorConsulted: "Lady Dr. Nabeela Aslam & Lady Dr. Nazia Jabeen",
    rating: 5,
    comment: "Lady Dr. Nabeela Aslam and Lady Dr. Nazia Jabeen are exceptional. Their calm demeanor, expert ultrasound scans, and caring maternity treatment made our delivery safe and smooth.",
    date: "November 2026"
  },
  {
    id: "t3",
    patientName: "Tariq Mehmood Chattha",
    location: "Alipur Chatha Road",
    doctorConsulted: "Dr. Jawad Malik",
    rating: 5,
    comment: "I had excruciating kidney stone pain in the middle of the night. The 24/7 emergency team stabilized me, and Dr. Jawad's treatment cleared the stones smoothly.",
    date: "August 2026"
  },
  {
    id: "t4",
    patientName: "Sobia Akram",
    location: "Sialkot Bypass",
    doctorConsulted: "Lady Dr. Javeria Safdar",
    rating: 5,
    comment: "My mother suffered a mild stroke. Lady Dr. Javeria's daily physiotherapy sessions enabled her to walk independently with full confidence again.",
    date: "September 2026"
  }
];

export const FAQS_DATA = [
  {
    question: "Is the Emergency Department open 24 hours?",
    answer: "Yes, our Emergency Department operates 24 hours a day, 7 days a week, 365 days a year. Triage, oxygen, and emergency medical officers are always available."
  },
  {
    question: "What are the timings for Diagnostic Ultrasound?",
    answer: "Our Diagnostic Ultrasound department is open daily from 02:30 PM to 05:30 PM under Lady Dr. Saira Malaika (MIT Diagnostic Sonographer) and on Wednesdays 10:00 AM – 01:00 PM with Lady Dr. Nabeela Aslam. Emergency sonography is available 24/7."
  },
  {
    question: "How do I book an appointment with a specialist?",
    answer: "You can book directly using the 'Book Appointment' button on the website, or call / WhatsApp our helpline at 0319-1401391 to instantly receive your consultation token."
  },
  {
    question: "Are Chughtai Lab diagnostic tests available round the clock?",
    answer: "Yes, Al Rehmat Hospital houses an official Chughtai Lab collection center. Blood tests and diagnostics are available 24/7, including home sample collection."
  },
  {
    question: "Where is Al Rehmat Hospital located?",
    answer: "The main hospital complex is located at Verpal Chatta, Saim Nala, Gujranwala. We also have a referral unit at Sialkot Bypass, opposite Sheikh Siddique Eye Hospital."
  },
  {
    question: "Are female doctors available for delivery and maternity checkups?",
    answer: "Yes, Lady Dr. Nabeela Aslam (MBBS, MCPS Obs/Gyne), Lady Dr. Anam Saleem (Gold Medalist), and Lady Dr. Nazia Jabeen (LHV) lead our maternity wing alongside experienced female nurses."
  }
];
