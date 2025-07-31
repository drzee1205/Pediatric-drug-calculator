import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Fluid, Electrolyte & Acid-Base Disorders drugs from Nelson's Textbook of Pediatrics
const fluidsDrugs = [
  {
    name: "Sodium Chloride",
    genericName: "Sodium Chloride",
    brandName: "Normal Saline, NS",
    description: "Isotonic crystalloid solution for fluid resuscitation",
    indications: "Fluid resuscitation, dehydration, sodium replacement, IV flush",
    contraindications: "Hypernatremia, fluid overload, heart failure",
    sideEffects: "Fluid overload, hypernatremia, hyperchloremic acidosis, edema",
    monitoring: "Fluid balance, electrolytes, weight, vital signs",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "10-20 mL/kg for bolus, then maintenance: 60-100 mL/kg/day",
        frequency: "PRN for bolus, continuous for maintenance",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Use 0.9% NaCl for isotonic fluid"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "20 mL/kg for bolus, then maintenance: 100-150 mL/kg/day",
        frequency: "PRN for bolus, continuous for maintenance",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Maintenance fluids include dextrose"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "20 mL/kg for bolus, then maintenance: 1500 mL/m²/day + 20 mL/kg for first 10 kg",
        frequency: "PRN for bolus, continuous for maintenance",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "May repeat bolus up to 60 mL/kg total"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "20 mL/kg for bolus, then maintenance: 1500 mL/m²/day + 20 mL/kg for first 10 kg",
        frequency: "PRN for bolus, continuous for maintenance",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Adult maintenance: 30-35 mL/kg/day"
      }
    ]
  },
  {
    name: "Lactated Ringer's",
    genericName: "Lactated Ringer's Solution",
    brandName: "LR",
    description: "Isotonic crystalloid with electrolytes",
    indications: "Fluid resuscitation, dehydration, burns, surgical fluid replacement",
    contraindications: "Hyperkalemia, metabolic alkalosis, liver failure",
    sideEffects: "Fluid overload, hyperkalemia, metabolic alkalosis",
    monitoring: "Fluid balance, electrolytes, liver function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "10-20 mL/kg for bolus",
        frequency: "PRN",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Contains calcium, do not mix with blood products"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "20 mL/kg for bolus",
        frequency: "PRN",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Use with caution in renal impairment"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "20 mL/kg for bolus",
        frequency: "PRN",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "May be preferred over NS for large volume resuscitation"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "20 mL/kg for bolus",
        frequency: "PRN",
        route: "IV",
        maxDose: "20 mL/kg bolus",
        notes: "Contains sodium, potassium, calcium, chloride, lactate"
      }
    ]
  },
  {
    name: "Potassium Chloride",
    genericName: "Potassium Chloride",
    brandName: "KCl",
    description: "Potassium replacement for hypokalemia",
    indications: "Hypokalemia, potassium depletion, metabolic alkalosis",
    contraindications: "Hyperkalemia, renal failure, severe tissue damage",
    sideEffects: "Hyperkalemia, cardiac arrhythmias, phlebitis, nausea",
    monitoring: "Serum potassium, ECG, renal function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "2-4 mEq/kg/day",
        frequency: "q6-24h",
        route: "IV/PO",
        maxDose: "0.5 mEq/kg/hour IV",
        notes: "IV concentration should not exceed 40 mEq/L"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "2-4 mEq/kg/day",
        frequency: "q6-24h",
        route: "IV/PO",
        maxDose: "0.5 mEq/kg/hour IV",
        notes: "Monitor ECG during IV administration"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-4 mEq/kg/day",
        frequency: "q6-24h",
        route: "IV/PO",
        maxDose: "0.5 mEq/kg/hour IV",
        notes: "Oral formulations available as liquids and tablets"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "40-80 mEq/day",
        frequency: "q6-24h",
        route: "IV/PO",
        maxDose: "10-20 mEq/hour IV",
        notes: "Never give IV push, must be diluted and infused slowly"
      }
    ]
  },
  {
    name: "Sodium Bicarbonate",
    genericName: "Sodium Bicarbonate",
    brandName: "Baking Soda",
    description: "Alkalinizing agent for acidosis",
    indications: "Metabolic acidosis, cardiac arrest, hyperkalemia",
    contraindications: "Metabolic alkalosis, hypocalcemia, hypernatremia",
    sideEffects: "Metabolic alkalosis, hypocalcemia, hypernatremia, fluid overload",
    monitoring: "Arterial blood gases, electrolytes, pH",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "1-2 mEq/kg slow IV push",
        frequency: "PRN",
        route: "IV",
        maxDose: "2 mEq/kg/dose",
        notes: "For cardiac arrest: 1 mEq/kg IV/IO"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-2 mEq/kg slow IV push",
        frequency: "PRN",
        route: "IV",
        maxDose: "2 mEq/kg/dose",
        notes: "Dilute 1:1 with sterile water for injection"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mEq/kg slow IV push",
        frequency: "PRN",
        route: "IV",
        maxDose: "2 mEq/kg/dose",
        notes: "For metabolic acidosis: calculate based on base deficit"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "50-100 mEq slow IV push",
        frequency: "PRN",
        route: "IV",
        maxDose: "100 mEq/dose",
        notes: "For continuous infusion: 150 mEq in 1L D5W at rate to correct pH"
      }
    ]
  },
  {
    name: "Calcium Gluconate",
    genericName: "Calcium Gluconate",
    brandName: "Calcium Gluconate",
    description: "Calcium replacement for hypocalcemia",
    indications: "Hypocalcemia, hyperkalemia, hypermagnesemia, cardiac arrest",
    contraindications: "Hypercalcemia, ventricular fibrillation, digitalis toxicity",
    sideEffects: "Hypercalcemia, bradycardia, hypotension, tissue necrosis if extravasated",
    monitoring: "Serum calcium, ECG, vital signs",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "100-200 mg/kg (1-2 mL/kg of 10% solution)",
        frequency: "q6-24h PRN",
        route: "IV",
        maxDose: "200 mg/kg/dose",
        notes: "Administer slowly over 5-10 minutes"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "100-200 mg/kg (1-2 mL/kg of 10% solution)",
        frequency: "q6-24h PRN",
        route: "IV",
        maxDose: "200 mg/kg/dose",
        notes: "For hyperkalemia: 30-60 mg/kg over 5-10 minutes"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "60-100 mg/kg (0.6-1 mL/kg of 10% solution)",
        frequency: "q6-24h PRN",
        route: "IV",
        maxDose: "2 g/dose",
        notes: "Monitor for bradycardia during administration"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-2 g (10-20 mL of 10% solution)",
        frequency: "q6-24h PRN",
        route: "IV",
        maxDose: "2 g/dose",
        notes: "Oral calcium available for maintenance therapy"
      }
    ]
  },
  {
    name: "Magnesium Sulfate",
    genericName: "Magnesium Sulfate",
    brandName: "Epsom Salt",
    description: "Magnesium replacement and anticonvulsant",
    indications: "Hypomagnesemia, eclampsia, severe asthma, torsades de pointes",
    contraindications: "Hypermagnesemia, heart block, myasthenia gravis",
    sideEffects: "Hypermagnesemia, hypotension, respiratory depression, areflexia",
    monitoring: "Serum magnesium, deep tendon reflexes, respiratory rate, blood pressure",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "25-50 mg/kg (0.1-0.2 mL/kg of 25% solution)",
        frequency: "q6-24h PRN",
        route: "IV/IM",
        maxDose: "50 mg/kg/dose",
        notes: "For hypomagnesemia in neonates"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "25-50 mg/kg (0.1-0.2 mL/kg of 25% solution)",
        frequency: "q6-24h PRN",
        route: "IV/IM",
        maxDose: "50 mg/kg/dose",
        notes: "For seizures: 20-50 mg/kg IV over 10-20 minutes"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "25-50 mg/kg (0.1-0.2 mL/kg of 25% solution)",
        frequency: "q6-24h PRN",
        route: "IV/IM",
        maxDose: "2 g/dose",
        notes: "For asthma: 25-75 mg/kg IV over 20 minutes"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-2 g (4-8 mL of 25% solution)",
        frequency: "q6-24h PRN",
        route: "IV/IM",
        maxDose: "4 g/dose",
        notes: "For eclampsia: 4-6 g IV loading, then 1-2 g/hour infusion"
      }
    ]
  },
  {
    name: "Dextrose",
    genericName: "Dextrose",
    brandName: "D5W, D10W, D25W, D50W",
    description: "Carbohydrate solution for energy and fluid maintenance",
    indications: "Hypoglycemia, fluid maintenance, calorie supplementation",
    contraindications: "Hyperglycemia, diabetes mellitus (without insulin)",
    sideEffects: "Hyperglycemia, fluid overload, phlebitis, hypokalemia",
    monitoring: "Blood glucose, fluid balance, electrolytes",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "D10W: 5-8 mg/kg/min for hypoglycemia",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "10 mg/kg/min",
        notes: "Maintenance fluids: D10W at 60-100 mL/kg/day"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "D10W: 5-8 mg/kg/min for hypoglycemia",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "10 mg/kg/min",
        notes: "Maintenance fluids: D10W at 100-150 mL/kg/day"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "D25W: 0.5-1 g/kg for hypoglycemia",
        frequency: "PRN",
        route: "IV",
        maxDose: "25 g/dose",
        notes: "For severe hypoglycemia: D25W 2-4 mL/kg IV push"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "D50W: 25-50 g for hypoglycemia",
        frequency: "PRN",
        route: "IV",
        maxDose: "50 g/dose",
        notes: "For severe hypoglycemia: D50W 50 mL IV push"
      }
    ]
  },
  {
    name: "Acetazolamide",
    genericName: "Acetazolamide",
    brandName: "Diamox",
    description: "Carbonic anhydrase inhibitor",
    indications: "Metabolic alkalosis, altitude sickness, glaucoma, edema",
    contraindications: "Hypokalemia, hyponatremia, renal failure, sulfa allergy",
    sideEffects: "Hypokalemia, metabolic acidosis, paresthesias, drowsiness",
    monitoring: "Electrolytes, acid-base status, renal function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "5 mg/kg/day in divided doses",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "300 mg/day",
        notes: "For metabolic alkalosis: 5 mg/kg/day"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "250-1000 mg/day in divided doses",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "1000 mg/day",
        notes: "For altitude sickness: 125 mg twice daily"
      }
    ]
  },
  {
    name: "Ammonium Chloride",
    genericName: "Ammonium Chloride",
    brandName: "Ammonium Chloride",
    description: "Acidifying agent for metabolic alkalosis",
    indications: "Metabolic alkalosis, urinary acidification",
    contraindications: "Metabolic acidosis, severe hepatic or renal impairment",
    sideEffects: "Nausea, vomiting, metabolic acidosis, hyperammonemia",
    monitoring: "Arterial blood gases, electrolytes, ammonia levels",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mEq/kg/day",
        frequency: "q6-8h",
        route: "PO/IV",
        maxDose: "2 mEq/kg/day",
        notes: "Calculate dose based on base deficit"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "50-100 mEq/day",
        frequency: "q6-8h",
        route: "PO/IV",
        maxDose: "200 mEq/day",
        notes: "IV solution must be diluted to <1% concentration"
      }
    ]
  },
  {
    name: "Sodium Phosphate",
    genericName: "Sodium Phosphate",
    brandName: "Phosphate Salts",
    description: "Phosphate replacement for hypophosphatemia",
    indications: "Hypophosphatemia, phosphate depletion",
    contraindications: "Hyperphosphatemia, severe renal impairment",
    sideEffects: "Hyperphosphatemia, hypocalcemia, metastatic calcification, diarrhea",
    monitoring: "Serum phosphate, calcium, renal function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.5-1 mmol/kg (0.5-1 mL/kg of sodium phosphate)",
        frequency: "q6-12h",
        route: "IV/PO",
        maxDose: "1 mmol/kg/dose",
        notes: "For severe hypophosphatemia: 0.25-0.5 mmol/kg IV over 6 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "15-30 mmol (15-30 mL of sodium phosphate)",
        frequency: "q6-12h",
        route: "IV/PO",
        maxDose: "30 mmol/dose",
        notes: "Oral phosphate available as tablets and solutions"
      }
    ]
  },
  {
    name: "Potassium Phosphate",
    genericName: "Potassium Phosphate",
    brandName: "K-Phos",
    description: "Potassium and phosphate replacement",
    indications: "Hypophosphatemia with hypokalemia",
    contraindications: "Hyperphosphatemia, hyperkalemia, severe renal impairment",
    sideEffects: "Hyperphosphatemia, hyperkalemia, hypocalcemia, tissue necrosis",
    monitoring: "Serum phosphate, potassium, calcium, renal function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.5-1 mmol/kg of phosphate",
        frequency: "q6-12h",
        route: "IV/PO",
        maxDose: "1 mmol/kg/dose",
        notes: "Contains both potassium and phosphate"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "15-30 mmol of phosphate",
        frequency: "q6-12h",
        route: "IV/PO",
        maxDose: "30 mmol/dose",
        notes: "Monitor potassium levels closely"
      }
    ]
  },
  {
    name: "Sodium Acetate",
    genericName: "Sodium Acetate",
    brandName: "Sodium Acetate",
    description: "Alkalinizing agent and bicarbonate precursor",
    indications: "Metabolic acidosis, bicarbonate replacement",
    contraindications: "Metabolic alkalosis, hypernatremia",
    sideEffects: "Metabolic alkalosis, hypernatremia, fluid overload",
    monitoring: "Arterial blood gases, electrolytes, fluid balance",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-4 mEq/kg",
        frequency: "PRN",
        route: "IV",
        maxDose: "4 mEq/kg/dose",
        notes: "1 mEq sodium acetate = 1 mEq bicarbonate equivalent"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "50-100 mEq",
        frequency: "PRN",
        route: "IV",
        maxDose: "100 mEq/dose",
        notes: "Often used in TPN solutions"
      }
    ]
  },
  {
    name: "3% Saline",
    genericName: "Hypertonic Saline",
    brandName: "3% NaCl",
    description: "Hypertonic saline for hyponatremia",
    indications: "Symptomatic hyponatremia, SIADH, cerebral salt wasting",
    contraindications: "Hypernatremia, heart failure, dehydration",
    sideEffects: "Hypernatremia, fluid overload, central pontine myelinolysis",
    monitoring: "Serum sodium, osmolality, neurological status",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "3-5 mL/kg over 30-60 minutes",
        frequency: "PRN",
        route: "IV",
        maxDose: "5 mL/kg/dose",
        notes: "For severe symptomatic hyponatremia"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100-150 mL over 30-60 minutes",
        frequency: "PRN",
        route: "IV",
        maxDose: "150 mL/dose",
        notes: "Correct sodium no faster than 2 mEq/L/hour"
      }
    ]
  },
  {
    name: "Furosemide",
    genericName: "Furosemide",
    brandName: "Lasix",
    description: "Loop diuretic for fluid overload",
    indications: "Fluid overload, heart failure, hypertension, hypercalcemia",
    contraindications: "Anuria, sulfa allergy, severe electrolyte depletion",
    sideEffects: "Hypokalemia, hyponatremia, dehydration, ototoxicity",
    monitoring: "Electrolytes, renal function, fluid balance, hearing",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q12-24h PRN",
        route: "IV/PO",
        maxDose: "2 mg/kg/dose",
        notes: "For chronic lung disease: 1-2 mg/kg/day"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q8-24h PRN",
        route: "IV/PO",
        maxDose: "2 mg/kg/dose",
        notes: "Monitor electrolytes closely"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-2 mg/kg/dose",
        frequency: "q6-24h PRN",
        route: "IV/PO",
        maxDose: "2 mg/kg/dose",
        notes: "IV dose should not exceed 4 mg/min"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "20-80 mg/dose",
        frequency: "q6-24h PRN",
        route: "IV/PO",
        maxDose: "80 mg/dose",
        notes: "Continuous IV infusion may be used in severe cases"
      }
    ]
  },
  {
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    brandName: "HCTZ",
    description: "Thiazide diuretic",
    indications: "Hypertension, edema, nephrogenic diabetes insipidus",
    contraindications: "Anuria, sulfa allergy, severe renal impairment",
    sideEffects: "Hypokalemia, hyponatremia, hypercalcemia, hyperglycemia",
    monitoring: "Electrolytes, renal function, blood glucose, uric acid",
    medicalSystemId: "5",
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
    name: "Spironolactone",
    genericName: "Spironolactone",
    brandName: "Aldactone",
    description: "Potassium-sparing diuretic",
    indications: "Hyperaldosteronism, heart failure, hypertension, ascites",
    contraindications: "Hyperkalemia, renal impairment, Addison's disease",
    sideEffects: "Hyperkalemia, gynecomastia, menstrual irregularities",
    monitoring: "Potassium levels, renal function, blood pressure",
    medicalSystemId: "5",
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
    name: "Mannitol",
    genericName: "Mannitol",
    brandName: "Osmitrol",
    description: "Osmotic diuretic",
    indications: "Cerebral edema, increased intraocular pressure, oliguria",
    contraindications: "Anuria, severe pulmonary edema, active intracranial bleeding",
    sideEffects: "Fluid overload, electrolyte imbalances, pulmonary edema, heart failure",
    monitoring: "Serum osmolality, electrolytes, renal function, neurological status",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.25-1 g/kg over 30-60 minutes",
        frequency: "q4-6h PRN",
        route: "IV",
        maxDose: "1 g/kg/dose",
        notes: "For cerebral edema: 0.25-1 g/kg IV over 30-60 minutes"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.25-1 g/kg over 30-60 minutes",
        frequency: "q4-6h PRN",
        route: "IV",
        maxDose: "1 g/kg/dose",
        notes: "Use 20-25% solution, monitor serum osmolality"
      }
    ]
  },
  {
    name: "Sodium Polystyrene Sulfonate",
    genericName: "Sodium Polystyrene Sulfonate",
    brandName: "Kayexalate",
    description: "Potassium-binding resin",
    indications: "Hyperkalemia",
    contraindications: "Hypokalemia, bowel obstruction, constipation",
    sideEffects: "Hypokalemia, constipation, bowel necrosis, hypernatremia",
    monitoring: "Serum potassium, sodium, bowel function",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.5-1 g/kg/dose",
        frequency: "q6-24h PRN",
        route: "PO/PR",
        maxDose: "1 g/kg/dose",
        notes: "Administer with sorbitol to prevent constipation"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.5-1 g/kg/dose",
        frequency: "q6-24h PRN",
        route: "PO/PR",
        maxDose: "1 g/kg/dose",
        notes: "For severe hyperkalemia: 1 g/kg PO or PR"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "15-30 g/dose",
        frequency: "q6-24h PRN",
        route: "PO/PR",
        maxDose: "50 g/dose",
        notes: "Onset of action 1-2 hours PO, 4-6 hours PR"
      }
    ]
  },
  {
    name: "Desmopressin",
    genericName: "Desmopressin Acetate",
    brandName: "DDAVP",
    description: "Vasopressin analog",
    indications: "Diabetes insipidus, nocturnal enuresis, hemophilia A, von Willebrand disease",
    contraindications: "Hyponatremia, heart failure, hypersensitivity to desmopressin",
    sideEffects: "Hyponatremia, headache, flushing, hypertension",
    monitoring: "Serum sodium, urine output, fluid balance",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.05-0.1 mcg twice daily",
        frequency: "q12h",
        route: "IV/SC",
        maxDose: "0.2 mcg/dose",
        notes: "For diabetes insipidus: 0.05-0.1 mcg twice daily"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.4 mcg daily",
        frequency: "q12-24h",
        route: "IV/SC/IN",
        maxDose: "0.4 mcg/dose",
        notes: "Intranasal: 5-40 mcg daily in divided doses"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.1-0.4 mcg daily",
        frequency: "q12-24h",
        route: "IV/SC/IN",
        maxDose: "0.4 mcg/dose",
        notes: "For nocturnal enuresis: 10-40 mcg intranasally at bedtime"
      }
    ]
  },
  {
    name: "Vasopressin",
    genericName: "Vasopressin",
    brandName: "Pitressin",
    description: "Antidiuretic hormone",
    indications: "Diabetes insipidus, vasodilatory shock, GI bleeding",
    contraindications: "Hypersensitivity to vasopressin, coronary artery disease",
    sideEffects: "Hyponatremia, hypertension, bradycardia, myocardial ischemia",
    monitoring: "Serum sodium, blood pressure, ECG, fluid balance",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.0003-0.005 units/kg/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "0.005 units/kg/min",
        notes: "For shock: 0.0003-0.005 units/kg/min"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.01-0.04 units/min",
        frequency: "Continuous infusion",
        route: "IV",
        maxDose: "0.04 units/min",
        notes: "For diabetes insipidus: 5-10 units IM/SC q8-12h"
      }
    ]
  },
  {
    name: "Tolvaptan",
    genericName: "Tolvaptan",
    brandName: "Samsca",
    description: "Vasopressin V2 receptor antagonist",
    indications: "Syndrome of inappropriate antidiuretic hormone secretion (SIADH)",
    contraindications: "Hypovolemia, hypersensitivity to tolvaptan, inability to sense thirst",
    sideEffects: "Thirst, dry mouth, hypernatremia, liver toxicity",
    monitoring: "Serum sodium, liver function tests, fluid status",
    medicalSystemId: "5",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "15 mg once daily, may increase to 30-60 mg daily",
        frequency: "q24h",
        route: "PO",
        maxDose: "60 mg/day",
        notes: "Initiate in hospital for close monitoring"
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    let createdCount = 0
    let dosageCount = 0

    for (const drugData of fluidsDrugs) {
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
      message: 'Fluid, Electrolyte & Acid-Base Disorders drugs seeded successfully',
      drugsCreated: createdCount,
      dosagesCreated: dosageCount
    })
  } catch (error) {
    console.error('Error seeding fluids drugs:', error)
    return NextResponse.json(
      { error: 'Failed to seed fluids drugs' },
      { status: 500 }
    )
  }
}