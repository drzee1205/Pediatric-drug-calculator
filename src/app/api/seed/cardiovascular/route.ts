import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Cardiovascular System drugs from Nelson's Textbook of Pediatrics
const cardiovascularDrugs = [
  {
    name: "Digoxin",
    genericName: "Digoxin",
    brandName: "Lanoxin",
    description: "Cardiac glycoside for heart failure and arrhythmias",
    indications: "Heart failure, atrial fibrillation, supraventricular tachycardia",
    contraindications: "Ventricular fibrillation, hypertrophic cardiomyopathy, digitalis toxicity",
    sideEffects: "Nausea, vomiting, arrhythmias, visual disturbances, headache",
    monitoring: "Serum levels (0.8-2 ng/mL), electrolytes, ECG, renal function",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "Loading: 20-30 mcg/kg, Maintenance: 8-12 mcg/kg/day",
        frequency: "q12-24h",
        route: "IV/PO",
        maxDose: "15 mcg/kg/day",
        notes: "Therapeutic range: 0.8-2 ng/mL"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "Loading: 30-50 mcg/kg, Maintenance: 10-15 mcg/kg/day",
        frequency: "q12h",
        route: "IV/PO",
        maxDose: "15 mcg/kg/day",
        notes: "Higher maintenance dose required in infants"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "Loading: 20-40 mcg/kg, Maintenance: 8-12 mcg/kg/day",
        frequency: "q12-24h",
        route: "IV/PO",
        maxDose: "250 mcg/day",
        notes: "Adjust dose based on renal function and serum levels"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "Loading: 0.75-1.5 mg, Maintenance: 0.125-0.375 mg/day",
        frequency: "q24h",
        route: "IV/PO",
        maxDose: "0.5 mg/day",
        notes: "Monitor for signs of toxicity closely"
      }
    ]
  },
  {
    name: "Furosemide",
    genericName: "Furosemide",
    brandName: "Lasix",
    description: "Loop diuretic for fluid overload and hypertension",
    indications: "Heart failure, edema, hypertension, renal impairment",
    contraindications: "Anuria, hypersensitivity to sulfonamides, severe electrolyte depletion",
    sideEffects: "Hypokalemia, hyponatremia, dehydration, ototoxicity, hypotension",
    monitoring: "Electrolytes, renal function, blood pressure, fluid status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q12-24h PRN",
        route: "IV/IM/PO",
        maxDose: "6 mg/kg/day",
        notes: "For chronic lung disease: 1-2 mg/kg/day"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q8-24h PRN",
        route: "IV/IM/PO",
        maxDose: "6 mg/kg/day",
        notes: "Monitor electrolytes closely"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q6-24h PRN",
        route: "IV/IM/PO",
        maxDose: "6 mg/kg/day",
        notes: "IV dose should not exceed 4 mg/min"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "20-80 mg/dose",
        frequency: "q6-24h PRN",
        route: "IV/IM/PO",
        maxDose: "600 mg/day",
        notes: "Continuous IV infusion may be used in severe cases"
      }
    ]
  },
  {
    name: "Propranolol",
    genericName: "Propranolol",
    brandName: "Inderal",
    description: "Non-selective beta-blocker",
    indications: "Hypertension, arrhythmias, migraine prophylaxis, infantile hemangiomas",
    contraindications: "Asthma, heart block, cardiogenic shock, bradycardia",
    sideEffects: "Bradycardia, hypotension, bronchospasm, fatigue, hypoglycemia",
    monitoring: "Heart rate, blood pressure, blood glucose, respiratory status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.5-2 mg/kg/day in divided doses",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "4 mg/kg/day",
        notes: "For hemangiomas: 2-3 mg/kg/day"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-4 mg/kg/day in divided doses",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "60 mg/day",
        notes: "Start low and titrate slowly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "10-80 mg/day in divided doses",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "640 mg/day",
        notes: "Extended-release formulations available"
      }
    ]
  },
  {
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandName: "Zestril, Prinivil",
    description: "ACE inhibitor for hypertension and heart failure",
    indications: "Hypertension, heart failure, diabetic nephropathy",
    contraindications: "Hypersensitivity to ACE inhibitors, angioedema history, pregnancy",
    sideEffects: "Cough, hyperkalemia, hypotension, angioedema, renal impairment",
    monitoring: "Renal function, electrolytes, blood pressure, cough",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.07-0.6 mg/kg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "40 mg/day",
        notes: "Start with 0.07 mg/kg/day and titrate"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "5-40 mg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "40 mg/day",
        notes: "Can be used alone or with diuretics"
      }
    ]
  },
  {
    name: "Enalapril",
    genericName: "Enalapril",
    brandName: "Vasotec",
    description: "ACE inhibitor for hypertension and heart failure",
    indications: "Hypertension, heart failure, left ventricular dysfunction",
    contraindications: "Hypersensitivity to ACE inhibitors, angioedema history, pregnancy",
    sideEffects: "Cough, hyperkalemia, hypotension, angioedema, renal impairment",
    monitoring: "Renal function, electrolytes, blood pressure, cough",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.5 mg/kg/day",
        frequency: "q12-24h",
        route: "PO/IV",
        maxDose: "40 mg/day",
        notes: "IV formulation available for hospitalized patients"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2.5-40 mg/day",
        frequency: "q12-24h",
        route: "PO/IV",
        maxDose: "40 mg/day",
        notes: "Start with low dose in volume-depleted patients"
      }
    ]
  },
  {
    name: "Amlodipine",
    genericName: "Amlodipine",
    brandName: "Norvasc",
    description: "Calcium channel blocker (dihydropyridine)",
    indications: "Hypertension, angina pectoris",
    contraindications: "Hypersensitivity to amlodipine, severe hypotension, cardiogenic shock",
    sideEffects: "Peripheral edema, headache, dizziness, flushing, reflex tachycardia",
    monitoring: "Blood pressure, heart rate, peripheral edema, therapeutic response",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.3 mg/kg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "10 mg/day",
        notes: "Start with 0.1 mg/kg/day and titrate"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2.5-10 mg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "10 mg/day",
        notes: "Can be used alone or with other antihypertensives"
      }
    ]
  },
  {
    name: "Atenolol",
    genericName: "Atenolol",
    brandName: "Tenormin",
    description: "Selective beta-1 blocker",
    indications: "Hypertension, angina pectoris, arrhythmias",
    contraindications: "Bradycardia, heart block, cardiogenic shock, severe asthma",
    sideEffects: "Bradycardia, hypotension, fatigue, bronchospasm, hypoglycemia",
    monitoring: "Heart rate, blood pressure, respiratory status, blood glucose",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.5-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "100 mg/day",
        notes: "Cardioselective but caution in asthma still needed"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "25-100 mg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "100 mg/day",
        notes: "Once daily dosing for hypertension"
      }
    ]
  },
  {
    name: "Spironolactone",
    genericName: "Spironolactone",
    brandName: "Aldactone",
    description: "Potassium-sparing diuretic and aldosterone antagonist",
    indications: "Heart failure, hypertension, edema, hyperaldosteronism",
    contraindications: "Hyperkalemia, renal impairment, Addison's disease",
    sideEffects: "Hyperkalemia, gynecomastia, menstrual irregularities, dizziness",
    monitoring: "Potassium levels, renal function, blood pressure, hormonal effects",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-3 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "100 mg/day",
        notes: "Monitor potassium levels closely"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-3 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "100 mg/day",
        notes: "Often used with loop diuretics"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "25-200 mg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "400 mg/day",
        notes: "For heart failure: 12.5-25 mg daily"
      }
    ]
  },
  {
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    brandName: "Microzide, HydroDIURIL",
    description: "Thiazide diuretic",
    indications: "Hypertension, edema, heart failure",
    contraindications: "Anuria, sulfonamide allergy, severe renal impairment",
    sideEffects: "Hypokalemia, hyponatremia, hypercalcemia, hyperglycemia, hyperuricemia",
    monitoring: "Electrolytes, renal function, blood glucose, uric acid, blood pressure",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "37.5 mg/day",
        notes: "Not typically used in infants under 6 months"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "50 mg/day",
        notes: "Monitor electrolytes regularly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "12.5-50 mg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "100 mg/day",
        notes: "Often combined with other antihypertensives"
      }
    ]
  },
  {
    name: "Adenosine",
    genericName: "Adenosine",
    brandName: "Adenocard",
    description: "Endogenous nucleoside for arrhythmia termination",
    indications: "Supraventricular tachycardia, diagnostic tool for arrhythmias",
    contraindications: "Second- or third-degree heart block, sick sinus syndrome",
    sideEffects: "Flushing, chest pain, dyspnea, bradycardia, asystole",
    monitoring: "ECG, blood pressure, heart rate, respiratory status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.05-0.1 mg/kg rapid IV push",
        frequency: "May repeat with double dose in 1-2 min",
        route: "IV",
        maxDose: "12 mg/dose",
        notes: "Administer rapidly over 1-2 seconds followed by saline flush"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1 mg/kg rapid IV push",
        frequency: "May repeat with 0.2 mg/kg in 1-2 min",
        route: "IV",
        maxDose: "12 mg/dose",
        notes: "Effects last <10 seconds"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "6 mg rapid IV push",
        frequency: "May repeat with 12 mg in 1-2 min",
        route: "IV",
        maxDose: "12 mg/dose",
        notes: "First-line for SVT in stable patients"
      }
    ]
  },
  {
    name: "Verapamil",
    genericName: "Verapamil",
    brandName: "Calan, Isoptin",
    description: "Calcium channel blocker (phenylalkylamine)",
    indications: "Supraventricular tachycardia, hypertension, angina",
    contraindications: "Hypotension, heart failure, sick sinus syndrome, Wolff-Parkinson-White",
    sideEffects: "Hypotension, bradycardia, constipation, dizziness, heart failure",
    monitoring: "ECG, blood pressure, heart rate, heart failure symptoms",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.3 mg/kg/dose",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "10 mg/dose",
        notes: "Use with caution in children <1 year"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "40-120 mg/dose",
        frequency: "q8h",
        route: "PO",
        maxDose: "480 mg/day",
        notes: "IV use should be reserved for older children"
      }
    ]
  },
  {
    name: "Amiodarone",
    genericName: "Amiodarone",
    brandName: "Cordarone, Pacerone",
    description: "Class III antiarrhythmic with multiple mechanisms",
    indications: "Ventricular arrhythmias, atrial fibrillation, supraventricular tachycardia",
    contraindications: "Severe sinus node dysfunction, second- or third-degree AV block",
    sideEffects: "Pulmonary toxicity, thyroid dysfunction, liver toxicity, corneal deposits",
    monitoring: "PFTs, thyroid function, LFTs, ECG, ophthalmologic exams",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "Loading: 5 mg/kg over 1 hour, then 10-15 mg/kg/day",
        frequency: "q24h",
        route: "IV/PO",
        maxDose: "15 mg/kg/day",
        notes: "Maintenance: 5-10 mg/kg/day"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "Loading: 5 mg/kg over 1 hour, then 800-1600 mg/day",
        frequency: "q24h",
        route: "IV/PO",
        maxDose: "1600 mg/day",
        notes: "Many drug interactions, monitor closely"
      }
    ]
  },
  {
    name: "Propranolol IV",
    genericName: "Propranolol Hydrochloride",
    brandName: "Inderal IV",
    description: "IV formulation of non-selective beta-blocker",
    indications: "Arrhythmias, hypertensive emergencies, thyrotoxicosis",
    contraindications: "Asthma, heart block, cardiogenic shock, bradycardia",
    sideEffects: "Bradycardia, hypotension, bronchospasm, heart block",
    monitoring: "ECG, blood pressure, heart rate, respiratory status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.01-0.1 mg/kg slow IV push",
        frequency: "q6-8h PRN",
        route: "IV",
        maxDose: "1 mg/dose",
        notes: "Administer slowly over 10 minutes"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.01-0.1 mg/kg slow IV push",
        frequency: "q6-8h PRN",
        route: "IV",
        maxDose: "3 mg/dose",
        notes: "Continuous infusion: 0.02-0.15 mg/kg/hour"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-3 mg slow IV push",
        frequency: "q6-8h PRN",
        route: "IV",
        maxDose: "5 mg/dose",
        notes: "Continuous infusion: 1-5 mg/hour"
      }
    ]
  },
  {
    name: "Dopamine",
    genericName: "Dopamine",
    brandName: "Intropin",
    description: "Endogenous catecholamine inotrope and vasopressor",
    indications: "Shock, heart failure, hypotension, low cardiac output",
    contraindications: "Pheochromocytoma, uncorrected tachyarrhythmias, ventricular fibrillation",
    sideEffects: "Tachycardia, arrhythmias, hypotension, tissue necrosis if extravasated",
    monitoring: "ECG, blood pressure, heart rate, urine output, perfusion status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Renal dose: 2-5 mcg/kg/min, Inotropic: 5-10 mcg/kg/min"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Vasopressor: >10 mcg/kg/min"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Use central line for concentrations >5 mcg/kg/min"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Titrate to hemodynamic response"
      }
    ]
  },
  {
    name: "Dobutamine",
    genericName: "Dobutamine",
    brandName: "Dobutrex",
    description: "Synthetic catecholamine inotrope",
    indications: "Cardiogenic shock, heart failure, low cardiac output",
    contraindications: "Hypersensitivity to dobutamine, idiopathic hypertrophic subaortic stenosis",
    sideEffects: "Tachycardia, arrhythmias, hypertension, hypotension, headache",
    monitoring: "ECG, blood pressure, heart rate, cardiac output",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Start at 2-5 mcg/kg/min and titrate"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Primarily inotropic effect"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Less arrhythmogenic than dopamine"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2-20 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "20 mcg/kg/min",
        notes: "Monitor for tachycardia"
      }
    ]
  },
  {
    name: "Epinephrine",
    genericName: "Epinephrine",
    brandName: "Adrenaline",
    description: "Endogenous catecholamine vasopressor and inotrope",
    indications: "Cardiac arrest, anaphylaxis, shock, severe hypotension",
    contraindications: "Hypersensitivity to epinephrine, cardiac arrhythmias",
    sideEffects: "Tachycardia, hypertension, arrhythmias, anxiety, tremor",
    monitoring: "ECG, blood pressure, heart rate, perfusion status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "0.01 mg/kg IV/IO, 0.1 mg/kg ET",
        frequency: "q3-5min PRN",
        route: "IV/IO/ET",
        maxDose: "1 mg/dose",
        notes: "Cardiac arrest: 0.01 mg/kg IV/IO q3-5min"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.01 mg/kg IV/IO, 0.1 mg/kg ET",
        frequency: "q3-5min PRN",
        route: "IV/IO/ET",
        maxDose: "1 mg/dose",
        notes: "Anaphylaxis: 0.01 mg/kg IM"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.01 mg/kg IV/IO, 0.1 mg/kg ET",
        frequency: "q3-5min PRN",
        route: "IV/IO/ET",
        maxDose: "1 mg/dose",
        notes: "Infusion: 0.1-1 mcg/kg/min"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1 mg IV/IO, 5-10 mg ET",
        frequency: "q3-5min PRN",
        route: "IV/IO/ET",
        maxDose: "1 mg/dose",
        notes: "Adult dosing for patients >40 kg"
      }
    ]
  },
  {
    name: "Norepinephrine",
    genericName: "Norepinephrine",
    brandName: "Levophed",
    description: "Endogenous catecholamine vasopressor",
    indications: "Septic shock, cardiogenic shock, severe hypotension",
    contraindications: "Hypersensitivity to norepinephrine, mesenteric or peripheral vascular thrombosis",
    sideEffects: "Hypertension, bradycardia, tissue necrosis if extravasated, arrhythmias",
    monitoring: "Blood pressure, heart rate, perfusion status, IV site",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "0.05-2 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "2 mcg/kg/min",
        notes: "Use central line, titrate to effect"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.05-2 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "2 mcg/kg/min",
        notes: "Potent vasoconstrictor"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.05-2 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "2 mcg/kg/min",
        notes: "Monitor for extravasation"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.05-2 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "2 mcg/kg/min",
        notes: "First-line for septic shock"
      }
    ]
  },
  {
    name: "Milrinone",
    genericName: "Milrinone",
    brandName: "Primacor",
    description: "Phosphodiesterase III inhibitor inotrope and vasodilator",
    indications: "Heart failure, cardiac surgery, pulmonary hypertension",
    contraindications: "Hypersensitivity to milrinone, severe renal impairment",
    sideEffects: "Hypotension, arrhythmias, thrombocytopenia, headache",
    monitoring: "Blood pressure, heart rate, cardiac output, renal function",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "Loading: 50 mcg/kg over 15-60 min, then 0.25-0.75 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "1 mcg/kg/min",
        notes: "Adjust dose in renal impairment"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "Loading: 50 mcg/kg over 15-60 min, then 0.25-0.75 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "1 mcg/kg/min",
        notes: "Inodilator with minimal chronotropic effect"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "Loading: 50 mcg/kg over 15-60 min, then 0.25-0.75 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "1 mcg/kg/min",
        notes: "Use with caution in hypotension"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "Loading: 50 mcg/kg over 15-60 min, then 0.375-0.75 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "1 mcg/kg/min",
        notes: "Often used post-cardiac surgery"
      }
    ]
  },
  {
    name: "Nitroprusside",
    genericName: "Sodium Nitroprusside",
    brandName: "Nipride",
    description: "Direct vasodilator for hypertensive emergencies",
    indications: "Hypertensive emergencies, heart failure, controlled hypotension",
    contraindications: "Hypersensitivity to nitroprusside, compensatory hypertension",
    sideEffects: "Hypotension, cyanide toxicity, thiocyanate toxicity, tachycardia",
    monitoring: "Blood pressure, cyanide levels, thiocyanate levels, acid-base status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.3-0.5 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "10 mcg/kg/min",
        notes: "Protect from light, monitor for cyanide toxicity"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.3-0.5 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "10 mcg/kg/min",
        notes: "Titrate to blood pressure response"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.3-0.5 mcg/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "10 mcg/kg/min",
        notes: "Maximum duration 48-72 hours"
      }
    ]
  },
  {
    name: "Labetalol",
    genericName: "Labetalol",
    brandName: "Normodyne, Trandate",
    description: "Combined alpha and beta blocker",
    indications: "Hypertension, hypertensive emergencies, pheochromocytoma",
    contraindications: "Heart block, cardiogenic shock, bronchial asthma, heart failure",
    sideEffects: "Hypotension, bradycardia, dizziness, nausea, scalp tingling",
    monitoring: "Blood pressure, heart rate, respiratory status",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.2-1 mg/kg/dose",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "20 mg/dose",
        notes: "IV: 0.2-1 mg/kg slow push over 2 minutes"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100-1200 mg/day",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "1200 mg/day",
        notes: "IV infusion: 0.5-3 mg/min"
      }
    ]
  },
  {
    name: "Captopril",
    genericName: "Captopril",
    brandName: "Capoten",
    description: "ACE inhibitor for hypertension and heart failure",
    indications: "Hypertension, heart failure, diabetic nephropathy",
    contraindications: "Hypersensitivity to ACE inhibitors, angioedema history, pregnancy",
    sideEffects: "Cough, hyperkalemia, hypotension, angioedema, rash",
    monitoring: "Renal function, electrolytes, blood pressure, cough",
    medicalSystemId: "3",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.15-3 mg/kg/day",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "150 mg/day",
        notes: "Start with 0.15 mg/kg/dose q8h"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "6.25-150 mg/day",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "450 mg/day",
        notes: "Take on empty stomach"
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    let createdCount = 0
    let dosageCount = 0

    for (const drugData of cardiovascularDrugs) {
      const { dosages, ...drug } = drugData
      
      // Create drug
      const createdDrug = await db.drug.create({
        data: drug
      })
      
      createdCount++
      
      // Create dosages for this drug
      for (const dosage of dosages) {
        await db.dosage.create({
          data: {
            ...dosage,
            drugId: createdDrug.id
          }
        })
        dosageCount++
      }
    }

    return NextResponse.json({ 
      message: 'Cardiovascular system drugs seeded successfully',
      drugsCreated: createdCount,
      dosagesCreated: dosageCount
    })
  } catch (error) {
    console.error('Error seeding cardiovascular drugs:', error)
    return NextResponse.json(
      { error: 'Failed to seed cardiovascular drugs' },
      { status: 500 }
    )
  }
}