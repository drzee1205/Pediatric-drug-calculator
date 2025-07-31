import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Neurology drugs from Nelson's Textbook of Pediatrics
const neurologyDrugs = [
  {
    name: "Phenobarbital",
    genericName: "Phenobarbital",
    brandName: "Luminal",
    description: "Barbiturate anticonvulsant used for various types of seizures",
    indications: "Generalized tonic-clonic seizures, focal seizures, neonatal seizures",
    contraindications: "Hypersensitivity to barbiturates, porphyria, severe respiratory depression",
    sideEffects: "Sedation, ataxia, cognitive impairment, behavioral changes",
    monitoring: "Serum levels, liver function tests, complete blood count",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "15-20 mg/kg loading dose, then 3-5 mg/kg/day maintenance",
        frequency: "q12h-q24h",
        route: "IV/IM/PO",
        maxDose: "40 mg/kg/day",
        notes: "Loading dose should be infused over 20-30 minutes IV"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "15-20 mg/kg loading dose, then 3-5 mg/kg/day maintenance",
        frequency: "q12h",
        route: "PO",
        maxDose: "6 mg/kg/day",
        notes: "Monitor serum levels 2-4 weeks after initiation"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "15-20 mg/kg loading dose, then 3-5 mg/kg/day maintenance",
        frequency: "q12h",
        route: "PO",
        maxDose: "300 mg/day",
        notes: "Therapeutic range: 15-40 mcg/mL"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "900-1200 mg loading dose, then 60-200 mg/day maintenance",
        frequency: "q12h-q24h",
        route: "PO",
        maxDose: "600 mg/day",
        notes: "May cause vitamin D deficiency and osteomalacia with long-term use"
      }
    ]
  },
  {
    name: "Phenytoin",
    genericName: "Phenytoin",
    brandName: "Dilantin",
    description: "Hydantoin anticonvulsant for seizure control",
    indications: "Generalized tonic-clonic seizures, focal seizures, status epilepticus",
    contraindications: "Hypersensitivity to hydantoins, sinus bradycardia, Adams-Stokes syndrome",
    sideEffects: "Nystagmus, ataxia, gingival hyperplasia, hirsutism, osteomalacia",
    monitoring: "Serum levels, liver function tests, complete blood count, folate levels",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "15-20 mg/kg loading dose, then 4-8 mg/kg/day maintenance",
        frequency: "q12h",
        route: "IV/PO",
        maxDose: "300 mg/day",
        notes: "IV infusion rate should not exceed 1-3 mg/kg/min"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "15-20 mg/kg loading dose, then 5-10 mg/kg/day maintenance",
        frequency: "q12h",
        route: "PO",
        maxDose: "200 mg/day",
        notes: "Therapeutic range: 10-20 mcg/mL"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "15-20 mg/kg loading dose, then 5-10 mg/kg/day maintenance",
        frequency: "q12h",
        route: "PO",
        maxDose: "400 mg/day",
        notes: "Monitor for gingival hyperplasia with long-term use"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1000 mg loading dose, then 300-600 mg/day maintenance",
        frequency: "q12h-q24h",
        route: "PO",
        maxDose: "600 mg/day",
        notes: "Nonlinear pharmacokinetics - small dose changes can cause large serum level changes"
      }
    ]
  },
  {
    name: "Carbamazepine",
    genericName: "Carbamazepine",
    brandName: "Tegretol",
    description: "Iminostilbene anticonvulsant and mood stabilizer",
    indications: "Focal seizures, generalized tonic-clonic seizures, trigeminal neuralgia",
    contraindications: "Hypersensitivity, history of bone marrow depression, MAOI use",
    sideEffects: "Diplopia, dizziness, hyponatremia, leukopenia, rash",
    monitoring: "Serum levels, CBC, liver function tests, electrolytes, drug levels",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "10-20 mg/kg/day in divided doses",
        frequency: "q6h-q8h",
        route: "PO",
        maxDose: "1000 mg/day",
        notes: "Start with 5 mg/kg/day and increase gradually"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "200-600 mg/day in divided doses",
        frequency: "q6h-q8h",
        route: "PO",
        maxDose: "1200 mg/day",
        notes: "Therapeutic range: 4-12 mcg/mL"
      }
    ]
  },
  {
    name: "Valproic Acid",
    genericName: "Valproic Acid",
    brandName: "Depakote",
    description: "Carboxylic acid derivative anticonvulsant",
    indications: "Generalized seizures, absence seizures, myoclonic seizures, migraine prophylaxis",
    contraindications: "Hepatic disease, mitochondrial disorders, urea cycle disorders",
    sideEffects: "Tremor, weight gain, hair loss, thrombocytopenia, hepatotoxicity",
    monitoring: "Serum levels, liver function tests, ammonia levels, CBC, drug levels",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "15-60 mg/kg/day in divided doses",
        frequency: "q8h-q12h",
        route: "PO",
        maxDose: "60 mg/kg/day",
        notes: "Therapeutic range: 50-100 mcg/mL"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "750-2000 mg/day in divided doses",
        frequency: "q8h-q12h",
        route: "PO",
        maxDose: "60 mg/kg/day",
        notes: "Risk of pancreatitis and hepatotoxicity"
      }
    ]
  },
  {
    name: "Levetiracetam",
    genericName: "Levetiracetam",
    brandName: "Keppra",
    description: "Pyrrolidone derivative anticonvulsant",
    indications: "Focal seizures, myoclonic seizures, primary generalized tonic-clonic seizures",
    contraindications: "Hypersensitivity to levetiracetam or pyrrolidone derivatives",
    sideEffects: "Somnolence, dizziness, behavioral changes, irritability",
    monitoring: "Serum levels, renal function",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "20-40 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "IV/PO",
        maxDose: "60 mg/kg/day",
        notes: "Adjust dose in renal impairment"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "20-40 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "60 mg/kg/day",
        notes: "Can be used as adjunctive therapy"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "20-40 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "3000 mg/day",
        notes: "No significant drug interactions"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1000-3000 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "3000 mg/day",
        notes: "Well tolerated with minimal side effects"
      }
    ]
  },
  {
    name: "Lamotrigine",
    genericName: "Lamotrigine",
    brandName: "Lamictal",
    description: "Phenyltriazine anticonvulsant",
    indications: "Focal seizures, generalized seizures, Lennox-Gastaut syndrome, bipolar disorder",
    contraindications: "Hypersensitivity to lamotrigine",
    sideEffects: "Rash, Stevens-Johnson syndrome, dizziness, headache, diplopia",
    monitoring: "Skin rash, liver function tests, CBC",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.3-2 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "400 mg/day",
        notes: "Slow titration required to minimize rash risk"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "25-200 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "500 mg/day",
        notes: "Dose adjustment required with valproic acid use"
      }
    ]
  },
  {
    name: "Topiramate",
    genericName: "Topiramate",
    brandName: "Topamax",
    description: "Fructopyranose sulfamate anticonvulsant",
    indications: "Focal seizures, generalized tonic-clonic seizures, Lennox-Gastaut syndrome, migraine prophylaxis",
    contraindications: "Hypersensitivity to topiramate",
    sideEffects: "Cognitive slowing, paresthesia, weight loss, metabolic acidosis, kidney stones",
    monitoring: "Serum bicarbonate, renal function, growth parameters",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-3 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "9 mg/kg/day",
        notes: "Start low and titrate slowly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "25-200 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "400 mg/day",
        notes: "Can cause cognitive side effects"
      }
    ]
  },
  {
    name: "Ethosuximide",
    genericName: "Ethosuximide",
    brandName: "Zarontin",
    description: "Succinimide anticonvulsant",
    indications: "Absence seizures",
    contraindications: "Hypersensitivity to succinimides",
    sideEffects: "GI upset, drowsiness, headache, hiccups, leukopenia",
    monitoring: "Serum levels, CBC, liver function tests",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "20-40 mg/kg/day in divided doses",
        frequency: "q12h-q24h",
        route: "PO",
        maxDose: "1500 mg/day",
        notes: "Therapeutic range: 40-100 mcg/mL"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "750-1500 mg/day in divided doses",
        frequency: "q12h-q24h",
        route: "PO",
        maxDose: "1500 mg/day",
        notes: "First-line treatment for absence seizures"
      }
    ]
  },
  {
    name: "Clonazepam",
    genericName: "Clonazepam",
    brandName: "Klonopin",
    description: "Benzodiazepine anticonvulsant",
    indications: "Myoclonic seizures, absence seizures, Lennox-Gastaut syndrome, panic disorder",
    contraindications: "Hypersensitivity to benzodiazepines, acute narrow-angle glaucoma",
    sideEffects: "Sedation, ataxia, behavioral changes, tolerance, dependence",
    monitoring: "Respiratory function, sedation levels, tolerance development",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.01-0.05 mg/kg/day in divided doses",
        frequency: "q8h-q12h",
        route: "PO",
        maxDose: "0.2 mg/kg/day",
        notes: "Use with caution due to sedation"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.01-0.05 mg/kg/day in divided doses",
        frequency: "q8h-q12h",
        route: "PO",
        maxDose: "0.2 mg/kg/day",
        notes: "Tolerance develops with long-term use"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5-4 mg/day in divided doses",
        frequency: "q8h-q12h",
        route: "PO",
        maxDose: "20 mg/day",
        notes: "Risk of dependence and withdrawal"
      }
    ]
  },
  {
    name: "Gabapentin",
    genericName: "Gabapentin",
    brandName: "Neurontin",
    description: "Gamma-aminobutyric acid analog anticonvulsant",
    indications: "Focal seizures, neuropathic pain",
    contraindications: "Hypersensitivity to gabapentin",
    sideEffects: "Dizziness, somnolence, ataxia, weight gain, peripheral edema",
    monitoring: "Renal function, therapeutic response",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "10-35 mg/kg/day in divided doses",
        frequency: "q8h",
        route: "PO",
        maxDose: "2400 mg/day",
        notes: "Adjust dose in renal impairment"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "900-1800 mg/day in divided doses",
        frequency: "q8h",
        route: "PO",
        maxDose: "3600 mg/day",
        notes: "Limited drug interactions"
      }
    ]
  },
  {
    name: "Oxcarbazepine",
    genericName: "Oxcarbazepine",
    brandName: "Trileptal",
    description: "Ketoderivative of carbamazepine anticonvulsant",
    indications: "Focal seizures, generalized tonic-clonic seizures",
    contraindications: "Hypersensitivity to oxcarbazepine or carbamazepine",
    sideEffects: "Diplopia, dizziness, nausea, hyponatremia, rash",
    monitoring: "Serum sodium levels, liver function tests, CBC",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "10-30 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "1800 mg/day",
        notes: "Less risk of drug interactions than carbamazepine"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "600-1200 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "2400 mg/day",
        notes: "Monitor sodium levels regularly"
      }
    ]
  },
  {
    name: "Zonisamide",
    genericName: "Zonisamide",
    brandName: "Zonegran",
    description: "Sulfonamide anticonvulsant",
    indications: "Focal seizures, generalized seizures, Lennox-Gastaut syndrome",
    contraindications: "Hypersensitivity to sulfonamides",
    sideEffects: "Somnolence, dizziness, anorexia, weight loss, kidney stones, cognitive slowing",
    monitoring: "Renal function, serum bicarbonate, growth parameters",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-8 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "12 mg/kg/day",
        notes: "Start with low dose and titrate slowly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100-400 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "600 mg/day",
        notes: "Can cause oligohidrosis and hyperthermia"
      }
    ]
  },
  {
    name: "Felbamate",
    genericName: "Felbamate",
    brandName: "Felbatol",
    description: "Dibenzazepine anticonvulsant",
    indications: "Lennox-Gastaut syndrome, refractory focal seizures",
    contraindications: "Hypersensitivity to felbamate, history of blood dyscrasia",
    sideEffects: "Aplastic anemia, hepatic failure, insomnia, weight loss, headache",
    monitoring: "Weekly CBC, liver function tests, drug levels",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "15-45 mg/kg/day in divided doses",
        frequency: "q6h",
        route: "PO",
        maxDose: "3600 mg/day",
        notes: "Use only when other treatments fail due to serious side effects"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1200-3600 mg/day in divided doses",
        frequency: "q6h",
        route: "PO",
        maxDose: "3600 mg/day",
        notes: "Requires close monitoring for aplastic anemia"
      }
    ]
  },
  {
    name: "Tiagabine",
    genericName: "Tiagabine",
    brandName: "Gabitril",
    description: "GABA reuptake inhibitor anticonvulsant",
    indications: "Adjunctive therapy for focal seizures",
    contraindications: "Hypersensitivity to tiagabine",
    sideEffects: "Dizziness, tremor, nervousness, difficulty concentrating, weakness",
    monitoring: "Therapeutic response, cognitive function",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-0.5 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "32 mg/day",
        notes: "Titrate slowly to minimize side effects"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "4-32 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "32 mg/day",
        notes: "Can exacerbate absence seizures"
      }
    ]
  },
  {
    name: "Vigabatrin",
    genericName: "Vigabatrin",
    brandName: "Sabril",
    description: "GABA transaminase inhibitor anticonvulsant",
    indications: "Infantile spasms, refractory focal seizures",
    contraindications: "Hypersensitivity to vigabatrin",
    sideEffects: "Visual field defects, sedation, weight gain, irritability",
    monitoring: "Visual field testing every 3 months, ophthalmologic exams",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "50-150 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "150 mg/kg/day",
        notes: "Risk of permanent vision loss"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "25-75 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "3000 mg/day",
        notes: "First-line treatment for infantile spasms"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1000-3000 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "3000 mg/day",
        notes: "Mandatory visual field monitoring"
      }
    ]
  },
  {
    name: "Pregabalin",
    genericName: "Pregabalin",
    brandName: "Lyrica",
    description: "GABA analog anticonvulsant",
    indications: "Adjunctive therapy for focal seizures, neuropathic pain, fibromyalgia",
    contraindications: "Hypersensitivity to pregabalin",
    sideEffects: "Dizziness, somnolence, weight gain, peripheral edema, dry mouth",
    monitoring: "Renal function, therapeutic response",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "150-600 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "600 mg/day",
        notes: "Adjust dose in renal impairment"
      }
    ]
  },
  {
    name: "Lacosamide",
    genericName: "Lacosamide",
    brandName: "Vimpat",
    description: "Functionalized amino acid anticonvulsant",
    indications: "Focal seizures",
    contraindications: "Hypersensitivity to lacosamide",
    sideEffects: "Dizziness, headache, nausea, diplopia, vertigo",
    monitoring: "ECG (PR interval), therapeutic response",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2-6 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "IV/PO",
        maxDose: "12 mg/kg/day",
        notes: "Can be used as adjunctive therapy"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100-400 mg/day in divided doses",
        frequency: "q12h",
        route: "IV/PO",
        maxDose: "400 mg/day",
        notes: "Monitor PR interval on ECG"
      }
    ]
  },
  {
    name: "Perampanel",
    genericName: "Perampanel",
    brandName: "Fycompa",
    description: "AMPA receptor antagonist anticonvulsant",
    indications: "Focal seizures, generalized tonic-clonic seizures",
    contraindications: "Hypersensitivity to perampanel",
    sideEffects: "Dizziness, somnolence, headache, falls, aggression, irritability",
    monitoring: "Behavioral changes, fall risk, therapeutic response",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2-12 mg/day at bedtime",
        frequency: "q24h",
        route: "PO",
        maxDose: "12 mg/day",
        notes: "Slow titration required, monitor for psychiatric effects"
      }
    ]
  },
  {
    name: "Clobazam",
    genericName: "Clobazam",
    brandName: "Onfi",
    description: "Benzodiazepine anticonvulsant",
    indications: "Lennox-Gastaut syndrome, adjunctive therapy for seizures",
    contraindications: "Hypersensitivity to benzodiazepines",
    sideEffects: "Sedation, drooling, ataxia, constipation, aggression",
    monitoring: "Respiratory function, sedation levels, behavior",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.1-1 mg/kg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "40 mg/day",
        notes: "Start low and titrate slowly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "5-40 mg/day in divided doses",
        frequency: "q12h",
        route: "PO",
        maxDose: "80 mg/day",
        notes: "Can be used as adjunctive therapy"
      }
    ]
  },
  {
    name: "Stiripentol",
    genericName: "Stiripentol",
    brandName: "Diacomit",
    description: "Anticonvulsant with multiple mechanisms",
    indications: "Dravet syndrome, severe myoclonic epilepsy of infancy",
    contraindications: "Hypersensitivity to stiripentol",
    sideEffects: "Anorexia, weight loss, somnolence, ataxia, neutropenia",
    monitoring: "CBC, liver function tests, weight, therapeutic response",
    medicalSystemId: "1",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "50 mg/kg/day in divided doses",
        frequency: "q8h",
        route: "PO",
        maxDose: "3000 mg/day",
        notes: "Must be used with clobazam and valproate"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "50 mg/kg/day in divided doses",
        frequency: "q8h",
        route: "PO",
        maxDose: "4000 mg/day",
        notes: "Inhibits cytochrome P450 enzymes"
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    let createdCount = 0
    let dosageCount = 0

    for (const drugData of neurologyDrugs) {
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
      message: 'Neurology drugs seeded successfully',
      drugsCreated: createdCount,
      dosagesCreated: dosageCount
    })
  } catch (error) {
    console.error('Error seeding neurology drugs:', error)
    return NextResponse.json(
      { error: 'Failed to seed neurology drugs' },
      { status: 500 }
    )
  }
}