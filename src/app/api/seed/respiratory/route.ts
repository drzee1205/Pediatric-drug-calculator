import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Respiratory System drugs from Nelson's Textbook of Pediatrics
const respiratoryDrugs = [
  {
    name: "Albuterol",
    genericName: "Albuterol",
    brandName: "Proventil, Ventolin",
    description: "Short-acting beta-2 agonist bronchodilator",
    indications: "Asthma, bronchiolitis, exercise-induced bronchospasm, COPD",
    contraindications: "Hypersensitivity to albuterol",
    sideEffects: "Tachycardia, tremor, nervousness, hypokalemia, headache",
    monitoring: "Heart rate, tremor, potassium levels, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.1-0.15 mg/kg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "2.5 mg/dose",
        notes: "Nebulized: 0.15 mg/kg in 2-3 mL saline q4-6h"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.15 mg/kg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "5 mg/dose",
        notes: "MDI: 1-2 puffs (90-180 mcg) q4-6h with spacer"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2.5-5 mg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "10 mg/day",
        notes: "Can be used continuously in severe asthma exacerbations"
      }
    ]
  },
  {
    name: "Levalbuterol",
    genericName: "Levalbuterol",
    brandName: "Xopenex",
    description: "R-isomer of albuterol, short-acting beta-2 agonist",
    indications: "Asthma, bronchiolitis, COPD",
    contraindications: "Hypersensitivity to levalbuterol",
    sideEffects: "Tachycardia, tremor, nervousness, hypokalemia",
    monitoring: "Heart rate, tremor, potassium levels, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.075 mg/kg/dose",
        frequency: "q4-8h PRN",
        route: "Nebulized",
        maxDose: "1.25 mg/dose",
        notes: "May cause less tachycardia than racemic albuterol"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.075 mg/kg/dose",
        frequency: "q4-8h PRN",
        route: "Nebulized",
        maxDose: "1.25 mg/dose",
        notes: "Equivalent to 0.15 mg/kg of racemic albuterol"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.63-1.25 mg/dose",
        frequency: "q4-8h PRN",
        route: "Nebulized",
        maxDose: "2.5 mg/dose",
        notes: "Available in 0.31 mg, 0.63 mg, and 1.25 mg unit doses"
      }
    ]
  },
  {
    name: "Ipratropium",
    genericName: "Ipratropium Bromide",
    brandName: "Atrovent",
    description: "Anticholinergic bronchodilator",
    indications: "Asthma, COPD, bronchiolitis (adjunctive therapy)",
    contraindications: "Hypersensitivity to ipratropium or atropine derivatives",
    sideEffects: "Dry mouth, cough, headache, paradoxical bronchospasm",
    monitoring: "Therapeutic response, adverse effects",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.25 mg (250 mcg) per dose",
        frequency: "q6-8h",
        route: "Nebulized",
        maxDose: "1 mg/day",
        notes: "Often combined with albuterol for synergistic effect"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.25-0.5 mg (250-500 mcg) per dose",
        frequency: "q6-8h",
        route: "Nebulized/MDI",
        maxDose: "2 mg/day",
        notes: "MDI: 1-2 puffs (17-34 mcg) q6-8h"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5 mg (500 mcg) per dose",
        frequency: "q6-8h",
        route: "Nebulized/MDI",
        maxDose: "2 mg/day",
        notes: "Slower onset than beta-agonists but longer duration"
      }
    ]
  },
  {
    name: "Fluticasone",
    genericName: "Fluticasone",
    brandName: "Flovent",
    description: "Inhaled corticosteroid",
    indications: "Asthma maintenance therapy, allergic rhinitis",
    contraindications: "Hypersensitivity to fluticasone, status asthmaticus",
    sideEffects: "Oropharyngeal candidiasis, dysphonia, cough, adrenal suppression",
    monitoring: "Growth velocity, adrenal function, oral hygiene",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "44-88 mcg twice daily",
        frequency: "q12h",
        route: "MDI/DPI",
        maxDose: "440 mcg/day",
        notes: "Start with lowest effective dose, rinse mouth after use"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "88-440 mcg twice daily",
        frequency: "q12h",
        route: "MDI/DPI",
        maxDose: "880 mcg/day",
        notes: "Available in HFA (44, 110, 220 mcg) and DPI (50, 100, 250 mcg)"
      }
    ]
  },
  {
    name: "Budesonide",
    genericName: "Budesonide",
    brandName: "Pulmicort",
    description: "Inhaled corticosteroid",
    indications: "Asthma maintenance therapy, croup",
    contraindications: "Hypersensitivity to budesonide",
    sideEffects: "Oropharyngeal candidiasis, dysphonia, cough, adrenal suppression",
    monitoring: "Growth velocity, adrenal function, oral hygiene",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.25-0.5 mg daily",
        frequency: "q12h-q24h",
        route: "Nebulized",
        maxDose: "1 mg/day",
        notes: "For croup: 2 mg single dose"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.25-1 mg daily",
        frequency: "q12h",
        route: "Nebulized/MDI/DPI",
        maxDose: "2 mg/day",
        notes: "MDI: 180 mcg twice daily, DPI: 90-180 mcg twice daily"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5-2 mg daily",
        frequency: "q12h",
        route: "Nebulized/MDI/DPI",
        maxDose: "2 mg/day",
        notes: "Available as nebulized suspension, MDI, and DPI"
      }
    ]
  },
  {
    name: "Montelukast",
    genericName: "Montelukast",
    brandName: "Singulair",
    description: "Leukotriene receptor antagonist",
    indications: "Asthma maintenance, allergic rhinitis, exercise-induced bronchospasm",
    contraindications: "Hypersensitivity to montelukast",
    sideEffects: "Headache, abdominal pain, elevated LFTs, neuropsychiatric effects",
    monitoring: "Liver function tests, behavioral changes, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "4-5 mg once daily",
        frequency: "q24h",
        route: "PO",
        maxDose: "5 mg/day",
        notes: "Chewable tablet: 4 mg (2-5 years), 5 mg (6-14 years)"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "10 mg once daily",
        frequency: "q24h",
        route: "PO",
        maxDose: "10 mg/day",
        notes: "Take evening; can be used alone or with other controllers"
      }
    ]
  },
  {
    name: "Theophylline",
    genericName: "Theophylline",
    brandName: "Theochron, Uniphyl",
    description: "Methylxanthine bronchodilator",
    indications: "Asthma, COPD, apnea of prematurity",
    contraindications: "Hypersensitivity to theophylline or xanthines",
    sideEffects: "Tachycardia, nausea, vomiting, seizures, arrhythmias",
    monitoring: "Serum levels (5-15 mcg/mL), heart rate, seizures",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "Loading: 5 mg/kg, Maintenance: 10-20 mg/kg/day",
        frequency: "q8-12h",
        route: "PO/IV",
        maxDose: "20 mg/kg/day",
        notes: "Therapeutic range: 5-15 mcg/mL"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "Loading: 5 mg/kg, Maintenance: 12-20 mg/kg/day",
        frequency: "q8-12h",
        route: "PO/IV",
        maxDose: "900 mg/day",
        notes: "Many drug interactions, monitor levels closely"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "Loading: 300-500 mg, Maintenance: 300-900 mg/day",
        frequency: "q8-12h",
        route: "PO/IV",
        maxDose: "900 mg/day",
        notes: "Sustained-release formulations available"
      }
    ]
  },
  {
    name: "Prednisone",
    genericName: "Prednisone",
    brandName: "Deltasone",
    description: "Oral corticosteroid",
    indications: "Asthma exacerbations, croup, allergic reactions, inflammatory conditions",
    contraindications: "Systemic fungal infections, hypersensitivity to prednisone",
    sideEffects: "Hyperglycemia, hypertension, immunosuppression, osteoporosis, adrenal suppression",
    monitoring: "Blood glucose, blood pressure, growth, bone density, adrenal function",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.5-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "60 mg/day",
        notes: "Taper dose over 5-10 days for asthma exacerbations"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "60 mg/day",
        notes: "Single morning dose to minimize adrenal suppression"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "40-60 mg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "80 mg/day",
        notes: "High-dose therapy for severe exacerbations"
      }
    ]
  },
  {
    name: "Dexamethasone",
    genericName: "Dexamethasone",
    brandName: "Decadron",
    description: "Potent corticosteroid",
    indications: "Croup, asthma exacerbations, cerebral edema, allergic reactions",
    contraindications: "Systemic fungal infections, hypersensitivity to dexamethasone",
    sideEffects: "Hyperglycemia, hypertension, immunosuppression, adrenal suppression",
    monitoring: "Blood glucose, blood pressure, electrolytes, adrenal function",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.15-0.6 mg/kg/day",
        frequency: "q6-24h",
        route: "PO/IV/IM",
        maxDose: "16 mg/day",
        notes: "For croup: 0.15-0.6 mg/kg/dose (max 10 mg) x 1-2 doses"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.15-0.6 mg/kg/day",
        frequency: "q6-24h",
        route: "PO/IV/IM",
        maxDose: "16 mg/day",
        notes: "Anti-inflammatory potency 25x greater than hydrocortisone"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5-24 mg/day",
        frequency: "q6-24h",
        route: "PO/IV/IM",
        maxDose: "24 mg/day",
        notes: "Minimal mineralocorticoid activity"
      }
    ]
  },
  {
    name: "Azithromycin",
    genericName: "Azithromycin",
    brandName: "Zithromax",
    description: "Macrolide antibiotic",
    indications: "Community-acquired pneumonia, bronchitis, pertussis, sinusitis",
    contraindications: "Hypersensitivity to macrolides",
    sideEffects: "GI upset, QT prolongation, liver enzyme elevation",
    monitoring: "Liver function tests, QT interval, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "10 mg/kg on day 1, then 5 mg/kg days 2-5",
        frequency: "q24h",
        route: "PO",
        maxDose: "500 mg/day",
        notes: "For pertussis: 10 mg/kg/day x 5 days"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "10 mg/kg on day 1, then 5 mg/kg days 2-5",
        frequency: "q24h",
        route: "PO",
        maxDose: "500 mg/day",
        notes: "Alternative for penicillin-allergic patients"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "500 mg on day 1, then 250 mg days 2-5",
        frequency: "q24h",
        route: "PO",
        maxDose: "500 mg/day",
        notes: "IV formulation available for hospitalized patients"
      }
    ]
  },
  {
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brandName: "Amoxil",
    description: "Aminopenicillin antibiotic",
    indications: "Community-acquired pneumonia, sinusitis, otitis media, bronchitis",
    contraindications: "Hypersensitivity to penicillins",
    sideEffects: "Rash, diarrhea, allergic reactions, C. difficile colitis",
    monitoring: "Allergic reactions, renal function, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "40-90 mg/kg/day",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "High dose (90 mg/kg/day) for resistant pneumococcus"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "40-90 mg/kg/day",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "First-line for community-acquired pneumonia"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "500-875 mg every 8-12 hours",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "Available in various formulations and strengths"
      }
    ]
  },
  {
    name: "Amoxicillin-Clavulanate",
    genericName: "Amoxicillin-Clavulanate",
    brandName: "Augmentin",
    description: "Aminopenicillin with beta-lactamase inhibitor",
    indications: "Community-acquired pneumonia, sinusitis, otitis media, aspiration pneumonia",
    contraindications: "Hypersensitivity to penicillins, history of liver dysfunction",
    sideEffects: "Diarrhea, rash, allergic reactions, liver enzyme elevation",
    monitoring: "Liver function tests, allergic reactions, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "40-90 mg/kg/day of amoxicillin component",
        frequency: "q12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "High dose for severe infections or resistant organisms"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "40-90 mg/kg/day of amoxicillin component",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "Extended-release formulation available (q12h dosing)"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "500-875 mg every 8-12 hours",
        frequency: "q8-12h",
        route: "PO",
        maxDose: "3 g/day",
        notes: "Clavulanate ratio varies by formulation"
      }
    ]
  },
  {
    name: "Ceftriaxone",
    genericName: "Ceftriaxone",
    brandName: "Rocephin",
    description: "Third-generation cephalosporin antibiotic",
    indications: "Community-acquired pneumonia, meningitis, sepsis, complicated infections",
    contraindications: "Hypersensitivity to cephalosporins, hyperbilirubinemic neonates",
    sideEffects: "Diarrhea, rash, allergic reactions, biliary sludge, C. difficile colitis",
    monitoring: "Renal function, liver function, biliary complications, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "50-100 mg/kg/day",
        frequency: "q12-24h",
        route: "IM/IV",
        maxDose: "4 g/day",
        notes: "Once daily dosing for most infections"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "50-100 mg/kg/day",
        frequency: "q12-24h",
        route: "IM/IV",
        maxDose: "4 g/day",
        notes: "For meningitis: 80-100 mg/kg/day q12h"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-2 g every 12-24 hours",
        frequency: "q12-24h",
        route: "IM/IV",
        maxDose: "4 g/day",
        notes: "Displaces bilirubin from albumin in neonates"
      }
    ]
  },
  {
    name: "Racemic Epinephrine",
    genericName: "Racemic Epinephrine",
    brandName: "Vaponefrin",
    description: "Alpha and beta adrenergic agonist",
    indications: "Croup, bronchiolitis, anaphylaxis",
    contraindications: "Hypersensitivity to epinephrine, cardiac arrhythmias",
    sideEffects: "Tachycardia, hypertension, anxiety, tremor, pallor",
    monitoring: "Heart rate, blood pressure, oxygen saturation, tremor",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.25-0.5 mL of 2.25% solution",
        frequency: "q20-30min PRN",
        route: "Nebulized",
        maxDose: "3 doses",
        notes: "For croup: 0.25-0.5 mL in 2-3 mL saline"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.25-0.75 mL of 2.25% solution",
        frequency: "q20-30min PRN",
        route: "Nebulized",
        maxDose: "3 doses",
        notes: "Observe for at least 2 hours after last dose"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5-1 mL of 2.25% solution",
        frequency: "q20-30min PRN",
        route: "Nebulized",
        maxDose: "3 doses",
        notes: "Can be used with dexamethasone for severe croup"
      }
    ]
  },
  {
    name: "Salbutamol",
    genericName: "Salbutamol",
    brandName: "Ventolin",
    description: "Short-acting beta-2 agonist bronchodilator (International name for albuterol)",
    indications: "Asthma, bronchiolitis, COPD, exercise-induced bronchospasm",
    contraindications: "Hypersensitivity to salbutamol",
    sideEffects: "Tachycardia, tremor, nervousness, hypokalemia",
    monitoring: "Heart rate, tremor, potassium levels, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.1-0.15 mg/kg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "2.5 mg/dose",
        notes: "International standard dosing similar to albuterol"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.15 mg/kg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "5 mg/dose",
        notes: "Available in various international formulations"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2.5-5 mg/dose",
        frequency: "q4-6h PRN",
        route: "Nebulized/MDI",
        maxDose: "10 mg/day",
        notes: "Continuous nebulization in severe exacerbations"
      }
    ]
  },
  {
    name: "Formoterol",
    genericName: "Formoterol",
    brandName: "Foradil, Perforomist",
    description: "Long-acting beta-2 agonist bronchodilator",
    indications: "Asthma maintenance, COPD (always used with inhaled corticosteroid)",
    contraindications: "Hypersensitivity to formoterol, acute bronchospasm",
    sideEffects: "Tachycardia, tremor, hypokalemia, paradoxical bronchospasm",
    monitoring: "Heart rate, tremor, potassium levels, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "12-24 mcg twice daily",
        frequency: "q12h",
        route: "DPI",
        maxDose: "48 mcg/day",
        notes: "Must be used with inhaled corticosteroid"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "12-24 mcg twice daily",
        frequency: "q12h",
        route: "DPI",
        maxDose: "48 mcg/day",
        notes: "Onset within 5-10 minutes, duration 12 hours"
      }
    ]
  },
  {
    name: "Salmeterol",
    genericName: "Salmeterol",
    brandName: "Serevent",
    description: "Long-acting beta-2 agonist bronchodilator",
    indications: "Asthma maintenance, COPD (always used with inhaled corticosteroid)",
    contraindications: "Hypersensitivity to salmeterol, acute bronchospasm",
    sideEffects: "Tachycardia, tremor, hypokalemia, paradoxical bronchospasm",
    monitoring: "Heart rate, tremor, potassium levels, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "50 mcg twice daily",
        frequency: "q12h",
        route: "MDI/DPI",
        maxDose: "100 mcg/day",
        notes: "Always use with inhaled corticosteroid"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "50 mcg twice daily",
        frequency: "q12h",
        route: "MDI/DPI",
        maxDose: "100 mcg/day",
        notes: "Onset within 10-20 minutes, duration 12 hours"
      }
    ]
  },
  {
    name: "Tiotropium",
    genericName: "Tiotropium",
    brandName: "Spiriva",
    description: "Long-acting anticholinergic bronchodilator",
    indications: "Asthma maintenance, COPD",
    contraindications: "Hypersensitivity to tiotropium or ipratropium",
    sideEffects: "Dry mouth, constipation, urinary retention, paradoxical bronchospasm",
    monitoring: "Therapeutic response, urinary retention, dry mouth",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2.5 mcg once daily",
        frequency: "q24h",
        route: "DPI",
        maxDose: "5 mcg/day",
        notes: "For asthma ≥6 years as add-on therapy"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2.5-5 mcg once daily",
        frequency: "q24h",
        route: "DPI",
        maxDose: "5 mcg/day",
        notes: "Onset within 30 minutes, duration 24 hours"
      }
    ]
  },
  {
    name: "Omalizumab",
    genericName: "Omalizumab",
    brandName: "Xolair",
    description: "Anti-IgE monoclonal antibody",
    indications: "Moderate-to-severe allergic asthma, chronic urticaria",
    contraindications: "Hypersensitivity to omalizumab, acute asthma exacerbation",
    sideEffects: "Injection site reactions, anaphylaxis, malignancy risk, parasitic infections",
    monitoring: "IgE levels, anaphylaxis risk, therapeutic response",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "75-375 mg every 2-4 weeks",
        frequency: "q14-28 days",
        route: "SC",
        maxDose: "375 mg/dose",
        notes: "Dose based on IgE level and body weight"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "75-375 mg every 2-4 weeks",
        frequency: "q14-28 days",
        route: "SC",
        maxDose: "375 mg/dose",
        notes: "For patients ≥6 years with allergic asthma"
      }
    ]
  },
  {
    name: "Mepolizumab",
    genericName: "Mepolizumab",
    brandName: "Nucala",
    description: "Anti-IL-5 monoclonal antibody",
    indications: "Severe eosinophilic asthma, eosinophilic granulomatosis with polyangiitis",
    contraindications: "Hypersensitivity to mepolizumab, acute asthma exacerbation",
    sideEffects: "Headache, injection site reactions, back pain, fatigue",
    monitoring: "Eosinophil counts, therapeutic response, adverse effects",
    medicalSystemId: "2",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "40 mg every 4 weeks",
        frequency: "q28 days",
        route: "SC",
        maxDose: "40 mg/dose",
        notes: "For patients ≥6 years with severe eosinophilic asthma"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100 mg every 4 weeks",
        frequency: "q28 days",
        route: "SC",
        maxDose: "100 mg/dose",
        notes: "Reduces eosinophil count and exacerbations"
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    let createdCount = 0
    let dosageCount = 0

    for (const drugData of respiratoryDrugs) {
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
      message: 'Respiratory system drugs seeded successfully',
      drugsCreated: createdCount,
      dosagesCreated: dosageCount
    })
  } catch (error) {
    console.error('Error seeding respiratory drugs:', error)
    return NextResponse.json(
      { error: 'Failed to seed respiratory drugs' },
      { status: 500 }
    )
  }
}