export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  opdRoom: string;
  languages: string[];
  availableDays: string[];
  availableSlots: string[];
  bio: string;
  specializations: string[];
  education: { degree: string; institution: string; year: string }[];
  accentColor: string;
  initials: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  overview: string;
  headOfDepartment: string;
  emergencyAvailable: boolean;
  phoneExtension: string;
  floorLocation: string;
  keyProcedures: string[];
  facilities: string[];
  stats: {
    surgeriesAnnual: string;
    successRate: string;
    specialistCount: number;
  };
  iconName: string;
  themeColor: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string;
  visitType: 'New Consultation' | 'Follow-up' | 'Second Opinion';
  symptoms: string;
  opdRoom: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    code: 'CARD',
    name: 'Cardiology & Vascular Surgery',
    shortName: 'Cardiology',
    tagline: 'Precision Cardiovascular Medicine & Complex Interventions',
    overview: 'The Heart & Vascular Institute at weCare provides tertiary and quaternary cardiovascular treatment. Equipped with two advanced hybrid bi-plane catheterization labs, 3D cardiac mapping systems, and dedicated coronary care units, our team delivers life-saving interventions round the clock.',
    headOfDepartment: 'Dr. Arthur Sterling, MD, DM, FACC',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 401',
    floorLocation: 'Wing B, 3rd Floor',
    keyProcedures: [
      'Primary Percutaneous Coronary Intervention (PCI)',
      'Transcatheter Aortic Valve Implantation (TAVI/TAVR)',
      'Coronary Artery Bypass Grafting (CABG)',
      'Electrophysiology Study & Radiofrequency Ablation',
      'Minimally Invasive Heart Valve Repair',
      'Pacemaker & ICD Implantation'
    ],
    facilities: [
      'Dual-Axis Digital Cath Labs',
      '24/7 Dedicated Cardiac ICU (CCU)',
      'Echocardiography & Strain Imaging Suite',
      'Advanced Cardiac Rehabilitation Gym'
    ],
    stats: {
      surgeriesAnnual: '4,200+',
      successRate: '99.4%',
      specialistCount: 4
    },
    iconName: 'Heart',
    themeColor: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800'
    }
  },
  {
    id: 'neurology',
    code: 'NEUR',
    name: 'Neurology & Neurosurgery',
    shortName: 'Neurology & Brain Spine',
    tagline: 'Pioneering Neurological Science & Micro-Neurosurgical Excellence',
    overview: 'The weCare Brain & Spine Center is a benchmark for complex neurovascular, skull-base, and functional neurosurgical procedures. Our team specializes in comprehensive stroke intervention within the golden hour, deep brain stimulation, and neuro-navigation spinal surgery.',
    headOfDepartment: 'Dr. Elena Rostova, MD, MCh (Neurosurgery)',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 405',
    floorLocation: 'Wing A, 4th Floor',
    keyProcedures: [
      'Comprehensive Acute Ischemic Stroke Thrombectomy',
      'Image-Guided Micro-Neurosurgery for Brain Tumors',
      'Minimally Invasive Spine Surgery (MISS)',
      'Stereotactic Radiosurgery & Radiotherapy',
      'Deep Brain Stimulation (DBS) for Parkinson’s',
      'Comprehensive Epilepsy Monitoring & Surgery'
    ],
    facilities: [
      'Intraoperative 3T MRI & StealthStation Neuro-Navigation',
      'Dedicated 18-Bed Neuro-Intensive Care Unit (NICU)',
      'Continuous Video-EEG Telemetry Suite',
      'Robotic-Assisted Spinal Guidance System'
    ],
    stats: {
      surgeriesAnnual: '2,900+',
      successRate: '98.8%',
      specialistCount: 3
    },
    iconName: 'Brain',
    themeColor: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800'
    }
  },
  {
    id: 'orthopedics',
    code: 'ORTH',
    name: 'Orthopedics & Joint Replacement',
    shortName: 'Orthopedics',
    tagline: 'Robotic Precision Joint Arthroplasty & Sports Medicine',
    overview: 'Specializing in computer-assisted and robotic total knee and hip replacements, arthroscopic sports reconstruction, and complex trauma fixation. We enable rapid postoperative mobilization through minimally invasive tissue-sparing surgical approaches.',
    headOfDepartment: 'Dr. Marcus Vance, MS, FRCS (Orth), FACS',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 410',
    floorLocation: 'Wing C, 2nd Floor',
    keyProcedures: [
      'Robotic-Arm Assisted Total Knee & Hip Arthroplasty',
      'Arthroscopic ACL, PCL & Meniscal Reconstructions',
      'Complex Revision Joint Replacements',
      'Shoulder Rotator Cuff & Labral Repair',
      'Pediatric Orthopedic Deformity Correction',
      'Pelvic-Acetabular Trauma Reconstruction'
    ],
    facilities: [
      'Mako Robotic Surgical Suite',
      'Laminar Airflow Orthopedic Operating Rooms',
      'Hydrotherapy & Gait Analysis Bio-Lab',
      'Rapid Mobilization Recovery Suites'
    ],
    stats: {
      surgeriesAnnual: '3,800+',
      successRate: '99.1%',
      specialistCount: 3
    },
    iconName: 'Bone',
    themeColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800'
    }
  },
  {
    id: 'pediatrics',
    code: 'PEDI',
    name: 'Pediatrics & Neonatal Intensive Care',
    shortName: 'Pediatrics & NICU',
    tagline: 'Gentle, Compassionate Pediatric Care from Newborns to Adolescents',
    overview: 'Our Children’s Pavilion provides family-centered care for common and complex childhood conditions. Our Level III Neonatal ICU (NICU) cares for premature infants from 24 weeks gestation with state-of-the-art neonatal ventilation and round-the-clock neonatologists.',
    headOfDepartment: 'Dr. Sarah Lin, MD, FAAP (Pediatrics & Neonatology)',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 420',
    floorLocation: 'Wing D, 1st Floor',
    keyProcedures: [
      'High-Risk Neonatal Resuscitation & Intensive Care',
      'Pediatric Cardiology & Congenital Anomaly Care',
      'Pediatric Pulmonology & Allergy Treatment',
      'Developmental Milestones & Neuro-Developmental Therapy',
      'Pediatric Minimally Invasive Laparoscopy',
      'Routine & Specialized Pediatric Immunizations'
    ],
    facilities: [
      'Level III Neonatal Intensive Care Unit (NICU)',
      'Pediatric High Dependency Unit (PHDU)',
      'Dedicated Child-Friendly Play Observation Rooms',
      'Milk Bank & Lactation Consultation Center'
    ],
    stats: {
      surgeriesAnnual: '1,800+',
      successRate: '99.6%',
      specialistCount: 3
    },
    iconName: 'Baby',
    themeColor: {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-200',
      badge: 'bg-teal-100 text-teal-800'
    }
  },
  {
    id: 'oncology',
    code: 'ONCO',
    name: 'Comprehensive Oncology & Cancer Care',
    shortName: 'Oncology',
    tagline: 'Multidisciplinary Precision Cancer Treatment & Immunotherapy',
    overview: 'weCare Cancer Institute brings together medical, surgical, and radiation oncologists in organ-specific tumor boards. Utilizing genomic profiling, targeted molecular therapies, and TrueBeam stereotactic linear accelerators, we deliver individualized cancer regimens.',
    headOfDepartment: 'Dr. Julian Thorne, MD, PhD, FASCO',
    emergencyAvailable: false,
    phoneExtension: 'Ext. 430',
    floorLocation: 'Wing B, Ground & 5th Floor',
    keyProcedures: [
      'Precision Chemotherapy & Targeted Immunotherapy',
      'Image-Guided Stereotactic Body Radiotherapy (SBRT)',
      'Cytoreductive Surgery & HIPEC Protocol',
      'Organ-Preserving Breast & Head-Neck Surgeries',
      'Next-Generation Genomic Tumor Profiling',
      'Supportive Palliative Care & Pain Management'
    ],
    facilities: [
      'TrueBeam High-Precision Linear Accelerator',
      'Daycare Chemotherapy Infusion Suite with Biosafety Hoods',
      'PET-CT & High-Resolution SPECT Scanner',
      'Dedicated Oncology Nutrition & Counseling Clinic'
    ],
    stats: {
      surgeriesAnnual: '2,600+',
      successRate: '96.5%',
      specialistCount: 3
    },
    iconName: 'ShieldAlert',
    themeColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-800'
    }
  },
  {
    id: 'obstetrics',
    code: 'OBGY',
    name: 'Obstetrics, Gynecology & Women’s Health',
    shortName: 'Women’s Health & Maternity',
    tagline: 'Holistic Maternal Care, Fetal Medicine & Gynecological Surgery',
    overview: 'From high-risk pregnancies and advanced fetal medicine screenings to minimally invasive gynecological laparoscopic procedures, our team prioritizes comfort, safety, and evidence-based clinical protocols for women at every stage of life.',
    headOfDepartment: 'Dr. Amara Patel, MD, FRCOG',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 440',
    floorLocation: 'Wing C, 3rd Floor',
    keyProcedures: [
      'High-Risk Pregnancy Management & Painless Labor (Epidural)',
      'Advanced Fetal Medicine 3D/4D Morphology Scans',
      'Laparoscopic Hysterectomy & Myomectomy',
      'Hysteroscopic Diagnostic & Operative Interventions',
      'Management of Endometriosis & PCOS',
      'Urogynecological Pelvic Floor Reconstruction'
    ],
    facilities: [
      'LDR (Labor-Delivery-Recovery) Luxury Suites',
      'Obstetric High Dependency Unit (OHDU)',
      'High-Definition Fetal Ultrasound Diagnostics',
      'Postnatal Well-Woman & Lactation Clinic'
    ],
    stats: {
      surgeriesAnnual: '3,400+',
      successRate: '99.8%',
      specialistCount: 3
    },
    iconName: 'HeartHandshake',
    themeColor: {
      bg: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'border-pink-200',
      badge: 'bg-pink-100 text-pink-800'
    }
  },
  {
    id: 'gastroenterology',
    code: 'GAST',
    name: 'Gastroenterology & Hepatology',
    shortName: 'Gastroenterology',
    tagline: 'Advanced Digestive Endoscopy & Comprehensive Liver Care',
    overview: 'Offering diagnosis and treatment for luminal gastrointestinal conditions, liver cirrhosis, pancreatitis, and biliary disorders. Our endoscopy suite is equipped with high-definition narrow-band imaging and endoscopic ultrasound (EUS).',
    headOfDepartment: 'Dr. Devendra Sharma, MD, DM (Gastro), FACG',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 450',
    floorLocation: 'Wing A, 2nd Floor',
    keyProcedures: [
      'Endoscopic Retrograde Cholangiopancreatography (ERCP)',
      'Endoscopic Ultrasound (EUS) & Fine Needle Biopsy',
      'Third-Space Endoscopy (POEM, ESD)',
      'Capsule Endoscopy for Small Bowel Disorders',
      'Management of Viral Hepatitis & Cirrhosis',
      'Esophageal Manometry & 24h pH-Impedance Testing'
    ],
    facilities: [
      'Quad-Suite High-Definition Endoscopy Unit',
      'Dedicated Liver Intensive Care Bay',
      'Breath Hydrogen & GI Motility Diagnostic Lab',
      'Fluoroscopy-Equipped Therapeutic Suite'
    ],
    stats: {
      surgeriesAnnual: '5,100+',
      successRate: '99.2%',
      specialistCount: 3
    },
    iconName: 'Activity',
    themeColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800'
    }
  },
  {
    id: 'emergency',
    code: 'EMER',
    name: 'Emergency, Trauma & Critical Care',
    shortName: 'Emergency 24/7',
    tagline: 'Level-1 Tertiary Trauma Care & Rapid Emergency Response',
    overview: 'Our emergency center operates non-stop 365 days a year with board-certified emergency medicine physicians, trauma surgeons, and triage nurses. We maintain an average door-to-doctor time under 6 minutes for critical emergencies.',
    headOfDepartment: 'Dr. Robert MacIntyre, MD, FACEP, Dip. Trauma Care',
    emergencyAvailable: true,
    phoneExtension: 'Ext. 911 / 100',
    floorLocation: 'Ground Floor, Direct Ambulance Ramp',
    keyProcedures: [
      'Acute Poly-Trauma Stabilization & Resuscitation',
      'Cardiopulmonary Arrest Advanced Resuscitation (ACLS)',
      'Emergency Airway & Rapid Sequence Intubation',
      'Toxicology & Poison Control Management',
      'Bedside Emergency Ultrasound (POCUS)',
      'Disaster Triage & Mass Casualty Preparedness'
    ],
    facilities: [
      '14-Bed Dedicated Resuscitation Bay with Ventilators',
      'Immediate CT-Scan & X-Ray Suite within Emergency',
      'Dedicated Emergency OT for Immediate Surgical Intervention',
      'Advanced Life Support (ALS) Ambulance Fleet with Telemetry'
    ],
    stats: {
      surgeriesAnnual: '12,000+ Cases',
      successRate: '99.5%',
      specialistCount: 3
    },
    iconName: 'Ambulance',
    themeColor: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-800'
    }
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology Doctors
  {
    id: 'doc-card-1',
    name: 'Dr. Arthur Sterling',
    title: 'Director & Chief Interventional Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Vascular Surgery',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    experienceYears: 24,
    rating: 4.96,
    reviewCount: 520,
    consultationFee: 120,
    opdRoom: 'OPD Suite 301',
    languages: ['English', 'German'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    bio: 'Dr. Arthur Sterling is a distinguished cardiologist with over 24 years of experience in complex coronary interventions, structural heart diseases, and TAVI procedures. He previously chaired interventional cardiology at Johns Hopkins affiliate centers.',
    specializations: [
      'Complex Bifurcation Angioplasty',
      'TAVI / TAVR Structural Valve Procedures',
      'Left Main Coronary Interventions',
      'Heart Failure Optimization'
    ],
    education: [
      { degree: 'Fellow of American College of Cardiology', institution: 'ACC, Washington DC', year: '2012' },
      { degree: 'DM (Cardiology)', institution: 'All India Institute of Medical Sciences', year: '2005' },
      { degree: 'MD (Internal Medicine)', institution: 'King’s College Hospital, London', year: '2001' }
    ],
    accentColor: 'from-rose-500 to-red-600',
    initials: 'AS'
  },
  {
    id: 'doc-card-2',
    name: 'Dr. Miriam Chen',
    title: 'Senior Consultant Electrophysiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Vascular Surgery',
    qualifications: 'MD, DM, FHRS (Cardiac Electrophysiology)',
    experienceYears: 16,
    rating: 4.92,
    reviewCount: 380,
    consultationFee: 105,
    opdRoom: 'OPD Suite 303',
    languages: ['English', 'Mandarin'],
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '03:00 PM', '04:30 PM'],
    bio: 'Dr. Miriam Chen is an authority in cardiac rhythm management, specializes in 3D electro-anatomical mapping and catheter ablation for atrial fibrillation and supraventricular tachycardias.',
    specializations: [
      'Radiofrequency & Cryoballoon Catheter Ablation',
      'Biventricular Pacemaker (CRT-D) Implantation',
      'Arrhythmia & Syncope Evaluation',
      'Leadless Pacemakers'
    ],
    education: [
      { degree: 'Clinical Cardiac EP Fellowship', institution: 'Cleveland Clinic, USA', year: '2014' },
      { degree: 'DM (Cardiology)', institution: 'National University of Singapore', year: '2010' }
    ],
    accentColor: 'from-rose-600 to-pink-600',
    initials: 'MC'
  },
  {
    id: 'doc-card-3',
    name: 'Dr. Tariq Al-Mansoor',
    title: 'Senior Cardiovascular Thoracic Surgeon',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Vascular Surgery',
    qualifications: 'MBBS, MS, MCh (CTVS), FACS',
    experienceYears: 19,
    rating: 4.94,
    reviewCount: 410,
    consultationFee: 130,
    opdRoom: 'OPD Suite 305',
    languages: ['English', 'Arabic'],
    availableDays: ['Tue', 'Thu', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Specialist in off-pump beating heart coronary bypass grafting and minimally invasive valve repair surgeries with exceptional long-term patency outcomes.',
    specializations: [
      'Off-Pump Coronary Artery Bypass Surgery',
      'Minimally Invasive Mitral & Aortic Valve Repair',
      'Thoracic Aortic Aneurysm Repair',
      'Adult Congenital Heart Defect Surgery'
    ],
    education: [
      { degree: 'MCh (Cardiovascular & Thoracic)', institution: 'Edinburgh Royal Infirmary', year: '2007' },
      { degree: 'Fellowship in Minimally Invasive Cardiac Surgery', institution: 'Toronto General Hospital', year: '2011' }
    ],
    accentColor: 'from-red-600 to-rose-700',
    initials: 'TA'
  },
  {
    id: 'doc-card-4',
    name: 'Dr. Sophia Reyes',
    title: 'Consultant Non-Invasive Cardiologist & Heart Failure Specialist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Vascular Surgery',
    qualifications: 'MD, FESC, Dip. Advanced Cardiac Imaging',
    experienceYears: 12,
    rating: 4.89,
    reviewCount: 290,
    consultationFee: 90,
    opdRoom: 'OPD Suite 307',
    languages: ['English', 'Spanish'],
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    availableSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Expert in stress echocardiography, cardiac MRI interpretation, preventive cardiometabolic care, and specialized women’s cardiovascular health.',
    specializations: [
      'Advanced 3D Echocardiography & Cardiac MRI',
      'Preventive Cardiology & Lipid Disorders',
      'Cardio-Oncology & Chemotherapy Toxicity Screening',
      'Heart Failure Guideline-Directed Medical Therapy'
    ],
    education: [
      { degree: 'Advanced Cardiovascular Imaging Fellowship', institution: 'Harvard Medical School / BWH', year: '2017' },
      { degree: 'MD (Cardiology)', institution: 'Universidad Complutense de Madrid', year: '2013' }
    ],
    accentColor: 'from-pink-500 to-rose-600',
    initials: 'SR'
  },

  // Neurology Doctors
  {
    id: 'doc-neur-1',
    name: 'Dr. Elena Rostova',
    title: 'Chief Neurosurgeon & Spine Specialist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MD, MCh (Neurosurgery), IFAANS',
    experienceYears: 22,
    rating: 4.97,
    reviewCount: 460,
    consultationFee: 125,
    opdRoom: 'OPD Suite 401',
    languages: ['English', 'Russian'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Dr. Elena Rostova is an acclaimed neurosurgeon specializing in complex skull-base tumors, awake craniotomies for gliomas in eloquent brain areas, and endoscopic pituitary surgery.',
    specializations: [
      'Awake Craniotomy & Brain Tumor Resection',
      'Endoscopic Skull Base & Pituitary Surgery',
      'Cerebrovascular Aneurysm Clipping & AVMs',
      'Cervical & Lumbar Artificial Disc Replacement'
    ],
    education: [
      { degree: 'Skull Base Surgery Fellowship', institution: 'University of Zurich', year: '2008' },
      { degree: 'MCh (Neurosurgery)', institution: 'Sechenov First Moscow State Medical University', year: '2004' }
    ],
    accentColor: 'from-indigo-600 to-blue-700',
    initials: 'ER'
  },
  {
    id: 'doc-neur-2',
    name: 'Dr. Nathan Wallace',
    title: 'Director of Stroke Medicine & Interventional Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MD, DM (Neurology), FINR',
    experienceYears: 17,
    rating: 4.91,
    reviewCount: 340,
    consultationFee: 110,
    opdRoom: 'OPD Suite 403',
    languages: ['English'],
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Spearheading our 24/7 Comprehensive Stroke Center, Dr. Wallace specializes in neuro-thrombectomy, carotid artery stenting, and acute neurovascular preservation.',
    specializations: [
      'Acute Stroke Mechanical Thrombectomy',
      'Carotid & Intracranial Artery Stenting',
      'Cerebral Digital Subtraction Angiography (DSA)',
      'Subarachnoid Hemorrhage Coiling'
    ],
    education: [
      { degree: 'Interventional Neuroradiology Fellowship', institution: 'Mount Sinai Hospital, NY', year: '2013' },
      { degree: 'DM (Neurology)', institution: 'Oxford University Medical School', year: '2009' }
    ],
    accentColor: 'from-blue-600 to-indigo-700',
    initials: 'NW'
  },
  {
    id: 'doc-neur-3',
    name: 'Dr. Priyanka Desai',
    title: 'Consultant Neurologist & Movement Disorder Specialist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, MD, DM (Neurology), DNB',
    experienceYears: 13,
    rating: 4.88,
    reviewCount: 310,
    consultationFee: 95,
    opdRoom: 'OPD Suite 406',
    languages: ['English', 'Hindi'],
    availableDays: ['Mon', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'],
    bio: 'Specialist in Parkinson’s disease management, botulinum toxin therapy for dystonia/spasticity, multiple sclerosis therapeutics, and epilepsy management.',
    specializations: [
      'Parkinson’s Disease & Deep Brain Stimulation Programming',
      'Botulinum Toxin Injection for Migraine & Spasticity',
      'Epilepsy Diagnosis & Management',
      'Peripheral Neuropathy & Myasthenia Gravis'
    ],
    education: [
      { degree: 'Movement Disorders Fellowship', institution: 'National Hospital for Neurology and Neurosurgery, London', year: '2016' },
      { degree: 'MD, DM (Neurology)', institution: 'NIMHANS, India', year: '2012' }
    ],
    accentColor: 'from-violet-600 to-indigo-600',
    initials: 'PD'
  },

  // Orthopedics Doctors
  {
    id: 'doc-orth-1',
    name: 'Dr. Marcus Vance',
    title: 'Director of Orthopedics & Robotic Joint Reconstruction',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MBBS, MS (Ortho), FRCS (Tr & Orth), FACS',
    experienceYears: 23,
    rating: 4.95,
    reviewCount: 510,
    consultationFee: 120,
    opdRoom: 'OPD Suite 201',
    languages: ['English', 'French'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Has conducted over 6,500 joint replacements with high-precision robotic navigation. Specializes in rapid recovery joint surgery enabling patients to walk within hours.',
    specializations: [
      'Robotic Assisted Total Knee Replacement',
      'Direct Anterior Approach Total Hip Replacement',
      'Complex Revision Hip and Knee Arthroplasty',
      'Fast-Track Postoperative Mobilization'
    ],
    education: [
      { degree: 'Adult Joint Reconstruction Fellowship', institution: 'Mayo Clinic, Rochester', year: '2006' },
      { degree: 'FRCS (Orthopedics)', institution: 'Royal College of Surgeons of England', year: '2003' }
    ],
    accentColor: 'from-amber-500 to-orange-600',
    initials: 'MV'
  },
  {
    id: 'doc-orth-2',
    name: 'Dr. Kendra Alvarez',
    title: 'Lead Sports Medicine Surgeon & Arthroscopy Specialist',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MD, MS (Ortho), Dip. Sports Medicine (IOC)',
    experienceYears: 14,
    rating: 4.91,
    reviewCount: 360,
    consultationFee: 100,
    opdRoom: 'OPD Suite 204',
    languages: ['English', 'Spanish'],
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Consultant surgeon for elite professional sports teams. Pioneer in multiligament knee reconstruction, cartilage grafting, and arthroscopic shoulder stabilization.',
    specializations: [
      'Arthroscopic Multi-Ligament Knee Reconstruction (ACL/PCL/MCL)',
      'Rotator Cuff & Bankart Labral Repair',
      'Autologous Chondrocyte Implantation (Cartilage Repair)',
      'Platelet-Rich Plasma (PRP) Regenerative Injections'
    ],
    education: [
      { degree: 'Sports Medicine & Arthroscopy Fellowship', institution: 'Hospital for Special Surgery (HSS), NY', year: '2015' },
      { degree: 'MD (Orthopedics)', institution: 'UCLA David Geffen School of Medicine', year: '2011' }
    ],
    accentColor: 'from-orange-500 to-amber-600',
    initials: 'KA'
  },
  {
    id: 'doc-orth-3',
    name: 'Dr. Jason Lee',
    title: 'Consultant Pediatric Orthopedics & Complex Deformity Correction',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MD, MS (Ortho), Fellowship Pediatric Orthopedics',
    experienceYears: 11,
    rating: 4.89,
    reviewCount: 275,
    consultationFee: 95,
    opdRoom: 'OPD Suite 207',
    languages: ['English', 'Korean'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    availableSlots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:30 PM'],
    bio: 'Devoted to treating congenital clubfoot, limb length discrepancy, developmental dysplasia of the hip (DDH), and adolescent idiopathic scoliosis.',
    specializations: [
      'Ponseti Method Clubfoot Correction',
      'Pediatric Scoliosis Correction & Growing Rods',
      'Limb Lengthening & Taylor Spatial Frame',
      'Pediatric Fractures & Growth Plate Injuries'
    ],
    education: [
      { degree: 'Pediatric Orthopedic Fellowship', institution: 'Boston Children’s Hospital / Harvard', year: '2018' },
      { degree: 'MS (Orthopedics)', institution: 'Seoul National University', year: '2014' }
    ],
    accentColor: 'from-amber-600 to-yellow-600',
    initials: 'JL'
  },

  // Pediatrics Doctors
  {
    id: 'doc-pedi-1',
    name: 'Dr. Sarah Lin',
    title: 'Director of Pediatrics & Senior Neonatologist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatal Intensive Care',
    qualifications: 'MD, FAAP, Fellowship Neonatal-Perinatal Medicine',
    experienceYears: 20,
    rating: 4.98,
    reviewCount: 490,
    consultationFee: 110,
    opdRoom: 'OPD Suite 101',
    languages: ['English', 'Mandarin'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    availableSlots: ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM'],
    bio: 'Renowned for saving extreme preterm infants and coordinating high-risk neonatal care. Warm and beloved by thousands of growing children and their parents.',
    specializations: [
      'Extreme Prematurity & Neonatal Critical Care',
      'Neonatal Pulmonary Hypertension & Therapeutic Hypothermia',
      'Childhood Growth & Nutritional Disorders',
      'Complex Pediatric Diagnostic Workup'
    ],
    education: [
      { degree: 'Neonatal-Perinatal Fellowship', institution: 'Children’s Hospital of Philadelphia (CHOP)', year: '2009' },
      { degree: 'MD (Pediatrics)', institution: 'Johns Hopkins School of Medicine', year: '2005' }
    ],
    accentColor: 'from-teal-500 to-emerald-600',
    initials: 'SL'
  },
  {
    id: 'doc-pedi-2',
    name: 'Dr. Omar Farooq',
    title: 'Consultant Pediatric Pulmonologist & Allergist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatal Intensive Care',
    qualifications: 'MBBS, MD (Pediatrics), MRCPCH (UK)',
    experienceYears: 13,
    rating: 4.90,
    reviewCount: 310,
    consultationFee: 90,
    opdRoom: 'OPD Suite 104',
    languages: ['English', 'Urdu'],
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Specialist in pediatric asthma, severe persistent allergies, cystic fibrosis, and recurrent wheezing in toddlers with sensitive child-friendly testing methods.',
    specializations: [
      'Childhood Asthma & Bronchoscopy',
      'Allergy Immunotherapy & Food Challenges',
      'Pediatric Sleep-Disordered Breathing',
      'Chronic Cough in Children'
    ],
    education: [
      { degree: 'MRCPCH', institution: 'Royal College of Paediatrics and Child Health, UK', year: '2014' },
      { degree: 'MD (Pediatrics)', institution: 'Aga Khan University Hospital', year: '2011' }
    ],
    accentColor: 'from-emerald-600 to-teal-700',
    initials: 'OF'
  },
  {
    id: 'doc-pedi-3',
    name: 'Dr. Chloe Bennett',
    title: 'General Pediatrician & Child Development Specialist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatal Intensive Care',
    qualifications: 'MD, FAAP, Board Certified General Pediatrics',
    experienceYears: 10,
    rating: 4.93,
    reviewCount: 330,
    consultationFee: 85,
    opdRoom: 'OPD Suite 108',
    languages: ['English'],
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Expert in developmental screenings, ADHD and autism early identification, childhood nutrition, preventative adolescent health, and newborn care.',
    specializations: [
      'Developmental Milestones & Early Intervention',
      'Newborn Care & Breastfeeding Support',
      'Pediatric Immunization Protocols',
      'Adolescent Wellness & Behavioral Health'
    ],
    education: [
      { degree: 'Residency in Pediatrics', institution: 'Seattle Children’s Hospital / UW', year: '2016' },
      { degree: 'MD', institution: 'Northwestern University Feinberg School of Medicine', year: '2013' }
    ],
    accentColor: 'from-teal-600 to-cyan-600',
    initials: 'CB'
  },

  // Oncology Doctors
  {
    id: 'doc-onco-1',
    name: 'Dr. Julian Thorne',
    title: 'Director of Cancer Institute & Surgical Oncologist',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Oncology & Cancer Care',
    qualifications: 'MD, PhD, FACS, FASCO',
    experienceYears: 25,
    rating: 4.97,
    reviewCount: 470,
    consultationFee: 140,
    opdRoom: 'OPD Suite 501',
    languages: ['English', 'German'],
    availableDays: ['Mon', 'Tue', 'Thu'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Renowned surgical oncologist leading multidisciplinary tumor boards. Specializes in organ-preserving oncological resections and robotic cancer surgery.',
    specializations: [
      'Robotic Gastrointestinal & Colorectal Cancer Surgery',
      'Complex Hepato-Pancreato-Biliary (HPB) Resections',
      'Hyperthermic Intraperitoneal Chemotherapy (HIPEC)',
      'Sentinel Lymph Node Biopsy & Reconstruction'
    ],
    education: [
      { degree: 'Surgical Oncology Fellowship', institution: 'Memorial Sloan Kettering Cancer Center, NY', year: '2005' },
      { degree: 'PhD in Tumor Biology', institution: 'Karolinska Institute, Sweden', year: '2002' },
      { degree: 'MD', institution: 'Heidelberg University', year: '1998' }
    ],
    accentColor: 'from-purple-600 to-indigo-700',
    initials: 'JT'
  },
  {
    id: 'doc-onco-2',
    name: 'Dr. Maya Sengupta',
    title: 'Senior Medical Oncologist & Hematologist',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Oncology & Cancer Care',
    qualifications: 'MBBS, MD, DM (Medical Oncology), ESMO Certified',
    experienceYears: 16,
    rating: 4.93,
    reviewCount: 395,
    consultationFee: 115,
    opdRoom: 'OPD Suite 504',
    languages: ['English', 'Bengali', 'Hindi'],
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Expert in genomic precision oncology, cellular immunotherapies, breast cancer, lung adenocarcinoma, and lymphoma chemotherapy protocols.',
    specializations: [
      'Targeted Molecular Therapy & Immunotherapy Checkpoint Inhibitors',
      'Genomic Next-Gen Sequencing Cancer Profiling',
      'Breast Cancer & Gynecological Oncology Chemotherapy',
      'Lymphoma, Myeloma & Chronic Leukemia Management'
    ],
    education: [
      { degree: 'ESMO Certification', institution: 'European Society for Medical Oncology', year: '2014' },
      { degree: 'DM (Medical Oncology)', institution: 'Tata Memorial Hospital, Mumbai', year: '2011' }
    ],
    accentColor: 'from-purple-500 to-fuchsia-600',
    initials: 'MS'
  },
  {
    id: 'doc-onco-3',
    name: 'Dr. Gregory Vance',
    title: 'Chief Radiation Oncologist',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Oncology & Cancer Care',
    qualifications: 'MD, DNB (Radiation Oncology), FASTRO',
    experienceYears: 18,
    rating: 4.90,
    reviewCount: 320,
    consultationFee: 110,
    opdRoom: 'OPD Suite 508',
    languages: ['English'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri'],
    availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'],
    bio: 'Specialist in stereotactic radiosurgery (SRS), SBRT for lung and prostate cancers, and high-dose brachytherapy with sub-millimeter precision TrueBeam technology.',
    specializations: [
      'Stereotactic Body Radiation Therapy (SBRT)',
      'Intensity Modulated & Image Guided Radiotherapy (IMRT/IGRT)',
      'Intracavitary High Dose Rate (HDR) Brachytherapy',
      'Radiation Treatment Planning for Head & Neck Cancers'
    ],
    education: [
      { degree: 'Clinical Radiation Oncology Fellowship', institution: 'MD Anderson Cancer Center, Houston', year: '2010' },
      { degree: 'MD (Radiotherapy)', institution: 'Imperial College London', year: '2006' }
    ],
    accentColor: 'from-fuchsia-600 to-purple-800',
    initials: 'GV'
  },

  // Obstetrics & Gynecology Doctors
  {
    id: 'doc-obgy-1',
    name: 'Dr. Amara Patel',
    title: 'Director of Women’s Health & Senior Obstetrician',
    departmentId: 'obstetrics',
    departmentName: 'Obstetrics, Gynecology & Women’s Health',
    qualifications: 'MBBS, MD (OBGYN), FRCOG (London), FACS',
    experienceYears: 22,
    rating: 4.98,
    reviewCount: 540,
    consultationFee: 115,
    opdRoom: 'OPD Suite 250',
    languages: ['English', 'Gujarati', 'Hindi'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Has safely delivered over 8,000 babies and specializes in high-risk pregnancies, multiple gestations, gestational diabetes, and gentle painless natural births.',
    specializations: [
      'High-Risk Pregnancy & Recurrent Pregnancy Loss',
      'Natural & Water Birth Delivery Protocols',
      'Vaginal Birth After Cesarean (VBAC)',
      'Obstetric Hemorrhage & Preeclampsia Protocols'
    ],
    education: [
      { degree: 'Fellowship of Royal College of Obstetricians & Gynaecologists', institution: 'RCOG, London', year: '2011' },
      { degree: 'MD (Obstetrics & Gynecology)', institution: 'Grant Medical College, Mumbai', year: '2004' }
    ],
    accentColor: 'from-pink-500 to-rose-600',
    initials: 'AP'
  },
  {
    id: 'doc-obgy-2',
    name: 'Dr. Hannah Berg',
    title: 'Consultant Laparoscopic Gynecologist & Urogynecologist',
    departmentId: 'obstetrics',
    departmentName: 'Obstetrics, Gynecology & Women’s Health',
    qualifications: 'MD, FACOG, Minimally Invasive Gynecologic Surgery (MIGS)',
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 380,
    consultationFee: 105,
    opdRoom: 'OPD Suite 253',
    languages: ['English', 'German'],
    availableDays: ['Tue', 'Thu', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Recognized for advanced keyhole laparoscopic hysterectomies, severe stage-IV endometriosis surgery, fibroid removal, and pelvic organ prolapse reconstruction.',
    specializations: [
      'Laparoscopic & Robotic Myomectomy / Hysterectomy',
      'Deep Infiltrating Endometriosis Excision',
      'Pelvic Organ Prolapse & Urinary Incontinence Slings',
      'Hysteroscopic Polypectomy & Septum Resection'
    ],
    education: [
      { degree: 'MIGS Fellowship', institution: 'Mayo Clinic, Phoenix', year: '2015' },
      { degree: 'MD (OBGYN)', institution: 'Charité – Universitätsmedizin Berlin', year: '2010' }
    ],
    accentColor: 'from-rose-500 to-pink-700',
    initials: 'HB'
  },
  {
    id: 'doc-obgy-3',
    name: 'Dr. Leanne Morris',
    title: 'Consultant Fetal Medicine Specialist & Perinatologist',
    departmentId: 'obstetrics',
    departmentName: 'Obstetrics, Gynecology & Women’s Health',
    qualifications: 'MD, Maternal-Fetal Medicine Fellowship (FMF Certified)',
    experienceYears: 12,
    rating: 4.91,
    reviewCount: 310,
    consultationFee: 110,
    opdRoom: 'OPD Suite 256',
    languages: ['English'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'],
    bio: 'Expert in early first-trimester screening, high-resolution fetal anomaly scans, amniocentesis, twin-to-twin transfusion evaluations, and fetal echocardiography.',
    specializations: [
      'High-Resolution Fetal Target Scan & Echocardiography',
      'Non-Invasive Prenatal Testing (NIPT) & Genetic Counseling',
      'Chorionic Villus Sampling (CVS) & Amniocentesis',
      'Fetal Growth Restriction Surveillance'
    ],
    education: [
      { degree: 'Fetal Medicine Foundation Certification', institution: 'FMF London', year: '2016' },
      { degree: 'MD (OBGYN)', institution: 'University of Sydney School of Medicine', year: '2012' }
    ],
    accentColor: 'from-pink-600 to-fuchsia-600',
    initials: 'LM'
  },

  // Gastroenterology Doctors
  {
    id: 'doc-gast-1',
    name: 'Dr. Devendra Sharma',
    title: 'Director of Gastroenterology & Advanced Endoscopy',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MD, DM (Gastroenterology), FACG, FASGE',
    experienceYears: 23,
    rating: 4.96,
    reviewCount: 480,
    consultationFee: 115,
    opdRoom: 'OPD Suite 210',
    languages: ['English', 'Hindi'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Pioneered several therapeutic endoscopic procedures in bile duct stone extraction, early esophageal neoplasm resection (ESD), and POEM for achalasia.',
    specializations: [
      'Diagnostic & Therapeutic ERCP',
      'Endoscopic Submucosal Dissection (ESD)',
      'Peroral Endoscopic Myotomy (POEM) for Achalasia',
      'Endoscopic Ultrasound (EUS) with Fine Needle Biopsy'
    ],
    education: [
      { degree: 'Advanced Therapeutic Endoscopy Fellowship', institution: 'Showa University Hospital, Tokyo', year: '2008' },
      { degree: 'DM (Gastroenterology)', institution: 'PGIMER, Chandigarh', year: '2004' }
    ],
    accentColor: 'from-emerald-600 to-teal-700',
    initials: 'DS'
  },
  {
    id: 'doc-gast-2',
    name: 'Dr. Valerie Dupont',
    title: 'Senior Hepatologist & Liver Transplant Physician',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MD, PhD, Fellow of European Board of Gastroenterology (FEBGH)',
    experienceYears: 16,
    rating: 4.92,
    reviewCount: 350,
    consultationFee: 110,
    opdRoom: 'OPD Suite 214',
    languages: ['English', 'French'],
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'Dedicated to the management of chronic liver cirrhosis, acute liver failure, metabolic steatohepatitis (MASH), hepatitis B/C, and pre/post liver transplant care.',
    specializations: [
      'Liver Cirrhosis Complication Management (Ascites, Varices)',
      'Liver Transplant Evaluation & Post-Transplant Care',
      'Fatty Liver Disease & Fibroscan Interpretation',
      'Autoimmune Hepatitis & Cholestatic Liver Diseases'
    ],
    education: [
      { degree: 'Transplant Hepatology Fellowship', institution: 'King’s College Hospital Liver Unit, London', year: '2014' },
      { degree: 'MD, PhD', institution: 'Sorbonne University, Paris', year: '2009' }
    ],
    accentColor: 'from-teal-600 to-emerald-800',
    initials: 'VD'
  },
  {
    id: 'doc-gast-3',
    name: 'Dr. Lucas Ribeiro',
    title: 'Consultant Luminal Gastroenterologist & IBD Specialist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MD, MSc, Board Certified Gastroenterology',
    experienceYears: 11,
    rating: 4.89,
    reviewCount: 290,
    consultationFee: 95,
    opdRoom: 'OPD Suite 218',
    languages: ['English', 'Portuguese'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:30 PM', '05:00 PM'],
    bio: 'Specialist in Inflammatory Bowel Disease (Crohn’s disease and Ulcerative Colitis), irritable bowel syndrome (IBS), celiac disease, and reflux disorders.',
    specializations: [
      'Inflammatory Bowel Disease Biologics Therapy',
      'High-Definition Colonoscopy & Colorectal Cancer Screening',
      'Irritable Bowel Syndrome & Gut Microbiome Therapeutics',
      'Reflux Disease & 24hr Wireless Bravo pH Monitoring'
    ],
    education: [
      { degree: 'IBD Advanced Clinical Fellowship', institution: 'University of Chicago Medicine', year: '2017' },
      { degree: 'MD (Gastroenterology)', institution: 'University of São Paulo', year: '2013' }
    ],
    accentColor: 'from-emerald-500 to-green-700',
    initials: 'LR'
  },

  // Emergency & Trauma Care Doctors
  {
    id: 'doc-emer-1',
    name: 'Dr. Robert MacIntyre',
    title: 'Director of Emergency Medicine & Trauma Resuscitation',
    departmentId: 'emergency',
    departmentName: 'Emergency, Trauma & Critical Care',
    qualifications: 'MD, FACEP, Dip. Trauma Care, ATLS Instructor',
    experienceYears: 21,
    rating: 4.96,
    reviewCount: 430,
    consultationFee: 100,
    opdRoom: 'Emergency Triage 01',
    languages: ['English'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['08:00 AM', '11:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'],
    bio: 'Veteran emergency physician with two decades of experience in mass-casualty triage, blunt and penetrating trauma resuscitation, and critical cardiac care.',
    specializations: [
      'Severe Poly-Trauma Stabilization & ATLS Resuscitation',
      'Emergency Airway & Rapid Sequence Intubation',
      'Shock & Cardiac Arrest Resuscitation',
      'Point-of-Care Ultrasound (eFAST, Bedside Echo)'
    ],
    education: [
      { degree: 'Fellow of American College of Emergency Physicians', institution: 'ACEP, USA', year: '2010' },
      { degree: 'Emergency Medicine Residency', institution: 'Massachusetts General Hospital / Harvard', year: '2005' }
    ],
    accentColor: 'from-red-600 to-rose-800',
    initials: 'RM'
  },
  {
    id: 'doc-emer-2',
    name: 'Dr. Anita Okonjo',
    title: 'Senior Consultant Emergency Physician & Toxicologist',
    departmentId: 'emergency',
    departmentName: 'Emergency, Trauma & Critical Care',
    qualifications: 'MBBS, MD (Emergency Medicine), Dip. Medical Toxicology',
    experienceYears: 14,
    rating: 4.92,
    reviewCount: 310,
    consultationFee: 95,
    opdRoom: 'Emergency Triage 02',
    languages: ['English', 'Yoruba'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun'],
    availableSlots: ['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
    bio: 'Specialist in acute poisoning, overdose management, anaphylaxis, acute respiratory failure, and rapid bedside point-of-care ultrasound.',
    specializations: [
      'Acute Medical Toxicology & Poison Reversal',
      'Anaphylaxis & Severe Allergic Emergencies',
      'Bedside Ultrasound for Shock Diagnostics',
      'Procedural Sedation & Fracture Reduction'
    ],
    education: [
      { degree: 'Medical Toxicology Fellowship', institution: 'Emory University School of Medicine, Atlanta', year: '2016' },
      { degree: 'MD (Emergency Medicine)', institution: 'University College Hospital', year: '2012' }
    ],
    accentColor: 'from-rose-600 to-red-700',
    initials: 'AO'
  },
  {
    id: 'doc-emer-3',
    name: 'Dr. Kyle Sanderson',
    title: 'Emergency Critical Care Specialist & Disaster Lead',
    departmentId: 'emergency',
    departmentName: 'Emergency, Trauma & Critical Care',
    qualifications: 'MD, Dual Boarded Emergency Medicine & Critical Care',
    experienceYears: 12,
    rating: 4.90,
    reviewCount: 260,
    consultationFee: 95,
    opdRoom: 'Emergency Triage 03',
    languages: ['English'],
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableSlots: ['08:30 AM', '11:30 AM', '02:30 PM', '05:30 PM'],
    bio: 'Dual-boarded specialist bridging emergency room stabilization and ICU transition. Expert in sepsis bundles, mechanical ventilation, and ECMO cannulation.',
    specializations: [
      'Severe Sepsis & Septic Shock Bundles',
      'Mechanical Ventilation Initiation in ER',
      'Extracorporeal CPR (E-CPR) & Mobile ECMO Protocol',
      'Emergency Vascular Access (Central Lines, Arterial Lines)'
    ],
    education: [
      { degree: 'Critical Care Fellowship', institution: 'University of Pittsburgh Medical Center (UPMC)', year: '2017' },
      { degree: 'MD', institution: 'Baylor College of Medicine', year: '2013' }
    ],
    accentColor: 'from-red-500 to-amber-700',
    initials: 'KS'
  }
];

export const HOSPITAL_TESTIMONIALS = [
  {
    id: 'test-1',
    patientName: 'David H. Reynolds',
    age: 62,
    department: 'Cardiology & Vascular Surgery',
    procedure: 'TAVI Valve Replacement & Coronary Stenting',
    quote: 'When my aortic valve stenosis worsened, open heart surgery carried huge risks. Dr. Sterling and the cardiology team performed a catheter-based TAVI. I walked the very next afternoon and went home on day three with zero chest pain. weCare gave me my active life back.',
    date: 'February 2026',
    verified: true,
    rating: 5
  },
  {
    id: 'test-2',
    patientName: 'Elena & Carlos Gomez',
    age: 34,
    department: 'Pediatrics & NICU',
    procedure: 'Preterm Infant Care (27 Weeks)',
    quote: 'Our twins arrived at 27 weeks gestation. Dr. Sarah Lin and the neonatal ICU nurses held our hands through every monitor beep and milestone. Today our babies are thriving, smiling, and meeting every developmental benchmark. The compassionate humanity at weCare is beyond words.',
    date: 'January 2026',
    verified: true,
    rating: 5
  },
  {
    id: 'test-3',
    patientName: 'Miriam Vance-Kaufman',
    age: 58,
    department: 'Orthopedics & Joint Replacement',
    procedure: 'Bilateral Robotic Total Knee Arthroplasty',
    quote: 'I suffered from bone-on-bone arthritis for seven agonizing years. Dr. Marcus Vance used their robotic system for both my knees. The precision was unreal: minimal surgical swelling, guided physio on the same day, and within eight weeks I was hiking trails again.',
    date: 'March 2026',
    verified: true,
    rating: 5
  }
];

export const HOSPITAL_STATS = [
  { value: '650+', label: 'Inpatient Hospital Beds', subtext: 'Including 140+ dedicated critical care ICUs' },
  { value: '99.4%', label: 'Clinical Quality & Survival', subtext: 'JCI gold benchmark across acute specialties' },
  { value: '45,000+', label: 'Major Surgeries Annually', subtext: 'Conducted across 28 laminar airflow theatres' },
  { value: '< 6 mins', label: 'Average ER Door-to-Doctor', subtext: '24/7 Level-1 trauma & stroke emergency bay' }
];

export const HOSPITAL_ACCREDITATIONS = [
  {
    name: 'Joint Commission International (JCI)',
    desc: 'Gold Seal of Approval for Patient Safety & Clinical Excellence',
    year: 'Certified 2024–2027'
  },
  {
    name: 'NABH Digital & Quaternary Accreditation',
    desc: 'National Accreditation Board for Healthcare Providers',
    year: 'Certified 2025'
  },
  {
    name: 'College of American Pathologists (CAP)',
    desc: 'Highest Standard for Laboratory and Diagnostic Accuracy',
    year: 'Certified 2025'
  },
  {
    name: 'ISO 9001:2015 Healthcare Standard',
    desc: 'Quality Management Systems Across All Clinical Divisions',
    year: 'Certified 2026'
  }
];

export const INITIAL_BOOKINGS: Appointment[] = [
  {
    id: 'WC-2026-8841',
    patientName: 'Sarah Jenkins',
    patientPhone: '+1 (555) 234-9081',
    patientEmail: 'sarah.jenkins@example.com',
    patientAge: 42,
    patientGender: 'Female',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Vascular Surgery',
    doctorId: 'doc-card-1',
    doctorName: 'Dr. Arthur Sterling',
    doctorTitle: 'Director & Chief Interventional Cardiologist',
    appointmentDate: '2026-10-15',
    timeSlot: '10:00 AM',
    visitType: 'New Consultation',
    symptoms: 'Occasional shortness of breath during exertion and elevated blood pressure.',
    opdRoom: 'OPD Suite 301',
    status: 'Confirmed',
    createdAt: '2026-10-06'
  },
  {
    id: 'WC-2026-7912',
    patientName: 'Michael Chang',
    patientPhone: '+1 (555) 872-3490',
    patientEmail: 'mchang@example.com',
    patientAge: 38,
    patientGender: 'Male',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    doctorId: 'doc-orth-2',
    doctorName: 'Dr. Kendra Alvarez',
    doctorTitle: 'Lead Sports Medicine Surgeon & Arthroscopy Specialist',
    appointmentDate: '2026-10-18',
    timeSlot: '02:30 PM',
    visitType: 'Follow-up',
    symptoms: 'Post-MRI review of right knee ACL tear from soccer match.',
    opdRoom: 'OPD Suite 204',
    status: 'Confirmed',
    createdAt: '2026-10-05'
  }
];
